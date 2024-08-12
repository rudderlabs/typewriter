//
//  RudderConfig.swift
//  RudderTyperSwiftExample
//
//  Created by Satheesh Kannan on 12/08/24.
//

import UIKit

struct RudderConfig: Codable {
    let writeKey: String
    let dataPlaneUrl: String
    let controlPlaneUrl: String
    
    enum CodingKeys: String, CodingKey {
        case writeKey = "WRITE_KEY"
        case dataPlaneUrl = "DATA_PLANE_URL"
        case controlPlaneUrl = "CONTROL_PLANE_URL"
    }
}
