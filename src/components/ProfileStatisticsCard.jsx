import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUsername } from "../redux/slices/userSlice";
import { fetchTotalViews } from "../redux/slices/statsSlice";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import {
  getResponsiveFontSize,
  truncateUsername,
  getResponsiveTextClasses,
} from "../utils/textUtils";
import { showErrorToast, showSuccessToast } from "../utils/toastUtils";

const ProfileStatisticsCard = ({ currentUser }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [unsubscribe, setUnsubscribe] = useState(null);

  const dispatch = useDispatch();
  const { total, monthly, loading, error } = useSelector(
    (state) =>
      state.stats || {
        total: 0,
        monthly: 0,
        loading: false,
        error: null,
      }
  );

  const username = useSelector((state) => selectUsername(state, currentUser));

  const fetchData = async (showLoadingState = false) => {
    if (!currentUser?.uid) {
      return;
    }

    if (!showLoadingState) setRefreshing(true);

    try {
      await dispatch(fetchTotalViews(currentUser.uid));
    } catch {
    } finally {
      setRefreshing(false);
      setIsFirstLoad(false);
    }
  };

  useEffect(() => {
    if (currentUser?.uid && isFirstLoad) {
      fetchData(true);
    }
  }, [currentUser?.uid, isFirstLoad]);

  useEffect(() => {
    if (currentUser?.uid) {
      const userDocRef = doc(db, "users", currentUser.uid);

      const unsubscribeListener = onSnapshot(
        userDocRef,
        (docSnapshot) => {
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            const currentMonth = new Date().toISOString().slice(0, 7);

            const totalViews = userData.totalViews || 0;
            const monthlyStats = userData.monthlyStats || {};
            const monthlyViews = monthlyStats[currentMonth] || 0;

            if (totalViews !== total || monthlyViews !== monthly) {
              dispatch(fetchTotalViews(currentUser.uid));
            }
          }
        },
        () => {}
      );

      setUnsubscribe(() => unsubscribeListener);

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [currentUser?.uid, dispatch, total, monthly]);

  const handleRefresh = () => {
    fetchData(true);
  };

  const formatLastUpdated = () => {
    return new Date().toLocaleTimeString();
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`iyilink.co/${username}`);
      showSuccessToast("Bağlantı kopyalandı!");
    } catch (err) {
      showErrorToast("Bağlantı kopyalanamadı. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div
      className="rounded-xl p-6 mb-8"
      style={{
        backgroundColor: "var(--color-card-bg)",
        borderColor: "var(--color-border)",
        boxShadow: "0 4px 12px var(--color-shadow)",
      }}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="min-w-0 flex-1">
          <h1
            className={`font-bold mb-1 truncate ${getResponsiveTextClasses(
              username
            )}`}
            style={{
              color: "var(--color-dark-text)",
              fontSize: getResponsiveFontSize(username, 1.5),
              lineHeight: "1.2",
            }}
            title={`@${username}`}
          >
            @{username}
          </h1>
          <div className="flex items-center min-w-0">
            <p
              className="truncate flex-1 text-sm sm:text-base"
              style={{ color: "var(--color-light-text)" }}
              title={`iyilink.co/${username}`}
            >
              <span className="hidden sm:inline">iyilink.co/</span>
              <span className="sm:hidden">iyilink.co/</span>
              <span className="font-medium">
                {truncateUsername(username, 15)}
              </span>
            </p>
            <button
              onClick={handleCopyToClipboard}
              className="ml-2 text-sm p-1 rounded-md flex-shrink-0 hover:bg-opacity-80 transition-colors"
              style={{
                backgroundColor: "var(--color-neutral-light)",
                color: "var(--color-dark-text)",
              }}
              title="Linki kopyala"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
          <p
            className="text-xs mt-1"
            style={{ color: "var(--color-light-text)" }}
          >
            Son güncelleme: <span>{formatLastUpdated()}</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto flex-shrink-0">
          <button
            onClick={handleRefresh}
            disabled={loading || refreshing}
            className="px-2 py-1 rounded-lg text-sm flex items-center justify-center"
            style={{
              backgroundColor: "var(--color-neutral-light)",
              color: "var(--color-dark-text)",
              opacity: loading || refreshing ? 0.7 : 1,
              cursor: loading || refreshing ? "not-allowed" : "pointer",
            }}
            title="İstatistikleri yenile"
          >
            <svg
              className={`w-4 h-4 mr-1 ${refreshing ? "animate-spin" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Yenile
          </button>

          <Link
            to="/profile/edit"
            className="px-4 py-2 rounded-lg transition-colors flex items-center justify-center"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "white",
              boxShadow: "0 2px 4px var(--color-shadow)",
            }}
          >
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Profili Düzenle
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-2 bg-red-50 text-red-600 text-sm rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className="p-4 rounded-lg"
          style={{
            backgroundColor: "var(--color-accent)",
            boxShadow: "0 2px 4px var(--color-shadow)",
          }}
        >
          <h3
            className="font-medium mb-2"
            style={{ color: "var(--color-dark-text)" }}
          >
            Toplam Görüntülenme
          </h3>
          {loading ? (
            <div className="flex items-center h-8">
              <div className="w-4 h-4 rounded-full border-t-2 border-r-transparent border-[color:var(--color-primary)] animate-spin mr-2"></div>
              <span
                className="text-sm"
                style={{ color: "var(--color-light-text)" }}
              >
                Yükleniyor...
              </span>
            </div>
          ) : (
            <p
              className="text-2xl font-bold"
              style={{ color: "var(--color-dark-text)" }}
            >
              {total.toLocaleString()}
            </p>
          )}
        </div>
        <div
          className="p-4 rounded-lg"
          style={{
            backgroundColor: "var(--color-accent)",
            boxShadow: "0 2px 4px var(--color-shadow)",
          }}
        >
          <h3
            className="font-medium mb-2"
            style={{ color: "var(--color-dark-text)" }}
          >
            Bu Ay
          </h3>
          {loading ? (
            <div className="flex items-center h-8">
              <div className="w-4 h-4 rounded-full border-t-2 border-r-transparent border-[color:var(--color-primary)] animate-spin mr-2"></div>
              <span
                className="text-sm"
                style={{ color: "var(--color-light-text)" }}
              >
                Yükleniyor...
              </span>
            </div>
          ) : (
            <p
              className="text-2xl font-bold"
              style={{ color: "var(--color-dark-text)" }}
            >
              {monthly.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileStatisticsCard;
