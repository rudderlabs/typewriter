//
//  ViewController.swift
//  RudderTyperSwiftExample
//
//  Created by Satheesh Kannan on 12/08/24.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }
    
    @IBAction func triggerEventAction(_ button: UIButton) {
        RudderTyperAnalytics.sampleEvent1()
    }
}

