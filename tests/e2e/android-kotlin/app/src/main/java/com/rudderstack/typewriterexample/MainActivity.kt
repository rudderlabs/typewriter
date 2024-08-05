package com.rudderstack.typewriterexample

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
import com.rudderstack.typewriterexample.ui.theme.TypeWriterExampleTheme

class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            TypeWriterExampleTheme {
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
    // Add your RudderTyper event here
}
