package com.rudderstack.typewriterexample

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
import com.rudderstack.android.sdk.core.RudderClient
import com.rudderstack.typewriterexample.ui.theme.TypeWriterExampleTheme

class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            TypeWriterExampleTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    MakeEvents(modifier = Modifier.padding(innerPadding))
                }
            }
        }
    }
}

@Composable
private fun MakeEvents(modifier: Modifier = Modifier) {
    Row(
        modifier = modifier
            .fillMaxSize()
            .wrapContentHeight(),
        horizontalArrangement = Arrangement.Center,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Button(
            onClick = {
                makeEvents()
            }
        ) {
            Text(text = "Make RudderTyper Events")
        }
    }
}

private fun makeEvents() {
    // Make RudderTyper events here
    val analytics: RudderClient? = RudderClient.getInstance()
    analytics?.track("New track Event")
}
