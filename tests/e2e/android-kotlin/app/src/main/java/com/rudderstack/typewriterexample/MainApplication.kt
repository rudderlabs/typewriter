package com.rudderstack.typewriterexample

import android.app.Application
import com.rudderstack.android.sdk.core.RudderClient
import com.rudderstack.android.sdk.core.RudderConfig
import com.rudderstack.android.sdk.core.RudderLogger

class MainApplication: Application() {
    override fun onCreate() {
        super.onCreate()

        // Initialize RudderStack SDK
        RudderClient.getInstance(
            this,
            BuildConfig.WRITE_KEY,
            RudderConfig.Builder()
                .withDataPlaneUrl(BuildConfig.DATA_PLANE_URL)
                .withControlPlaneUrl(BuildConfig.CONTROL_PLANE_URL)
                .withLogLevel(RudderLogger.RudderLogLevel.VERBOSE)
                .build()
        )
    }
}
