'use client';

import { useEffect, useState } from 'react';

const SESSION_SEEN_KEY = 'splash_seen';
const DEFAULT_MIN_DURATION_MS = 360;
const REDUCED_MOTION_MIN_DURATION_MS = 140;
const SAFETY_TIMEOUT_MS = 1000;

export default function LoadingSplash({ children }: { children: React.ReactNode }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (sessionStorage.getItem(SESSION_SEEN_KEY) === '1') {
            setIsVisible(false);
            return;
        }

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const minDuration = prefersReducedMotion
            ? REDUCED_MOTION_MIN_DURATION_MS
            : DEFAULT_MIN_DURATION_MS;

        const startedAt = Date.now();
        let hasHidden = false;
        let minTimer: number | null = null;

        const hideSplash = () => {
            if (hasHidden) return;
            hasHidden = true;
            sessionStorage.setItem(SESSION_SEEN_KEY, '1');
            setIsVisible(false);
        };

        const completeWhenReady = () => {
            const elapsed = Date.now() - startedAt;
            const remaining = Math.max(0, minDuration - elapsed);
            minTimer = window.setTimeout(hideSplash, remaining);
        };

        if (document.readyState === 'complete') {
            completeWhenReady();
        } else {
            window.addEventListener('load', completeWhenReady, { once: true });
        }

        const safetyTimer = window.setTimeout(hideSplash, SAFETY_TIMEOUT_MS);

        return () => {
            window.removeEventListener('load', completeWhenReady);
            window.clearTimeout(safetyTimer);
            if (minTimer !== null) {
                window.clearTimeout(minTimer);
            }
        };
    }, []);

    return (
        <>
            <div
                className={`transition-opacity duration-200 ${isVisible ? 'opacity-0' : 'opacity-100'}`}
                aria-hidden={isVisible}
            >
                {children}
            </div>

            {isVisible && (
                <div className="loading-splash" role="status" aria-live="polite" aria-label="Loading website">
                    <div className="splash-content">
                        <div className="fingerprint-shell" aria-hidden="true">
                            <svg viewBox="0 0 220 240" className="fingerprint-svg">
                                <path d="M110 18C63 18 24 56 24 106C24 168 59 224 110 224C161 224 196 168 196 106C196 56 157 18 110 18" className="fingerprint-path p1" />
                                <path d="M110 30C69 30 36 63 36 106C36 162 66 212 110 212C154 212 184 162 184 106C184 63 151 30 110 30" className="fingerprint-path p2" />
                                <path d="M110 42C76 42 49 70 49 106C49 155 74 200 110 200C146 200 171 155 171 106C171 70 144 42 110 42" className="fingerprint-path p3" />
                                <path d="M110 54C83 54 61 77 61 106C61 149 82 188 110 188C138 188 159 149 159 106C159 77 137 54 110 54" className="fingerprint-path p4" />
                                <path d="M110 66C90 66 74 84 74 106C74 142 91 176 110 176C129 176 146 142 146 106C146 84 130 66 110 66" className="fingerprint-path p5" />
                                <path d="M110 78C97 78 86 90 86 106C86 136 98 164 110 164C122 164 134 136 134 106C134 90 123 78 110 78" className="fingerprint-path p6" />
                                <path d="M110 90C104 90 99 96 99 106C99 129 104 152 110 152C116 152 121 129 121 106C121 96 116 90 110 90" className="fingerprint-path p7" />
                                <path d="M58 106C58 142 75 189 110 207" className="fingerprint-path p8" />
                                <path d="M162 106C162 142 145 189 110 207" className="fingerprint-path p9" />
                                <path d="M44 108C44 159 70 204 110 220" className="fingerprint-path p10" />
                                <path d="M176 108C176 159 150 204 110 220" className="fingerprint-path p11" />
                                <path d="M110 102C110 118 110 132 110 146" className="fingerprint-path p12" />
                            </svg>
                            <div className="scan-line" />
                        </div>

                        <p className="splash-title">Loading Portfolio</p>
                        <p className="splash-subtitle">Running secure fingerprint scan</p>
                        <div className="splash-dots" aria-hidden="true">
                            <span />
                            <span />
                            <span />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
