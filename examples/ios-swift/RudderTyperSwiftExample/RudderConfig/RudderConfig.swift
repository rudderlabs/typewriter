//
//  RudderConfig.swift
//  RudderTyperSwiftExample
//
//  Created by Satheesh Kannan on 12/08/24.
//

import UIKit

/**
 This is a model class for Rudder SDK configuration.
 */
struct RudderConfig: Codable {
    /**
     * Write key for the Rudder SDK.
     */
    let writeKey: String
    /**
     * Data plane url string for the Rudder SDK.
     */
    let dataPlaneUrl: String
    /**
     * Control plane url string for the Rudder SDK.
     */
    let controlPlaneUrl: String
    
    /**
     * Coding keys to generate the model values.
     */
    enum CodingKeys: String, CodingKey {
        case writeKey = "WRITE_KEY"
        case dataPlaneUrl = "DATA_PLANE_URL"
        case controlPlaneUrl = "CONTROL_PLANE_URL"
    }
}
