//
//  RudderConfig.m
//  RudderTyperExample
//
//  Created by Satheesh Kannan on 08/08/24.
//

#import "RudderConfig.h"

#pragma mark - RudderConfig
@implementation RudderConfig
/**
 * This funtion will initialize this model with all properties.
 */
- (instancetype)initWithDictionary:(NSDictionary *)dictionary {
    self = [super init];
    if (self) {
        _writeKey = dictionary[@"WRITE_KEY"] ?: @"";
        _dataPlaneUrl = dictionary[@"DATA_PLANE_URL"] ?: @"";
        _controlPlaneUrl = dictionary[@"CONTROL_PLANE_URL"] ?: @"";
    }
    return self;
}

@end
