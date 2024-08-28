//
//  ViewController.m
//  RudderTyperExample
//
//  Created by Satheesh Kannan on 08/08/24.
//

#import "ViewController.h"
#import <Rudder/Rudder.h>
#import "RSRudderTyperAnalytics.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

- (IBAction)triggerEventAction:(UIButton *)sender {
    [RSRudderTyperAnalytics sampleTrackEventName];
}

@end
