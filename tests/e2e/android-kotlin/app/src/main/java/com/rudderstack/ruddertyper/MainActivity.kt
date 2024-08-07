package com.rudderstack.ruddertyper

import android.content.Context
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.material3.Button
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import com.rudderstack.ruddertyper.generated.RudderTyperAnalytics
import com.rudderstack.ruddertyper.generated.SampleEvent1
import com.rudderstack.ruddertyper.ui.theme.RudderTyperTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            RudderTyperTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    AnalyticsEvent(modifier = Modifier.padding(innerPadding), context = this)
                }
            }
        }
    }
}

@Composable
private fun AnalyticsEvent(modifier: Modifier = Modifier, context: Context) {
    Row(
        modifier = modifier
            .fillMaxSize()
            .wrapContentHeight(),
        horizontalArrangement = Arrangement.Center,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Button(
            onClick = {
                makeRudderTyperEvent(context)
            }
        ) {
            Text(text = "Trigger Event")
        }
    }
}

private fun makeRudderTyperEvent(context: Context) {
    RudderTyperAnalytics.with(context)
        .sampleEvent1(
            SampleEvent1.Builder()
                .sampleProperty1("Random property 1")
                .build()
        )
}
