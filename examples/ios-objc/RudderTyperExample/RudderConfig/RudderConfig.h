//
//  RudderConfig.h
//  RudderTyperExample
//
//  Created by Satheesh Kannan on 08/08/24.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN
/**
 * This is model class for Rudder SDK configuration.
 */
@interface RudderConfig : NSObject
/**
 * Write key for the Rudder SDK.
 */
@property (nonatomic, strong) NSString *writeKey;
/**
 * Data plane url string for the Rudder SDK.
 */
@property (nonatomic, assign) NSString *dataPlaneUrl;
/**
 * Control plane url string for the Rudder SDK.
 */
@property (nonatomic, strong) NSString *controlPlaneUrl;

/**
 * This funtion will initialize this model with all properties.
 *
 * @param dictionary Dictionary to initialize this model.
 * @return RudderConfig instance.
 */
- (instancetype)initWithDictionary:(NSDictionary *)dictionary;

@end

NS_ASSUME_NONNULL_END
