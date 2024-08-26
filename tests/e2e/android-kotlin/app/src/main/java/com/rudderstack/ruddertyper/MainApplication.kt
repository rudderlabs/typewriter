package com.rudderstack.ruddertyper

import android.app.Application
import com.rudderstack.android.sdk.core.RudderClient
import com.rudderstack.android.sdk.core.RudderConfig
import com.rudderstack.android.sdk.core.RudderLogger

class MainApplication: Application() {
    override fun onCreate() {
        super.onCreate()
        initAnalyticsSdk()
    }

    private fun initAnalyticsSdk() {
        RudderClient.getInstance(
            this,
            BuildConfig.WRITE_KEY,
            RudderConfig.Builder()
                .withDataPlaneUrl(BuildConfig.DATA_PLANE_URL)
                .withControlPlaneUrl(BuildConfig.CONTROL_PLANE_URL)
                .withTrackLifecycleEvents(false)
                .withLogLevel(RudderLogger.RudderLogLevel.VERBOSE)
                .build()
        )
    }
}
