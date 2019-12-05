/**
 * This client was automatically generated by Segment Typewriter. ** Do Not Edit **
 */

#import "SEGOptionalArrayWithPropertiesItem.h"

@implementation SEGOptionalArrayWithPropertiesItem

+(nonnull instancetype) initWithOptionalAny:(nullable id)optionalAny
optionalArray:(nullable NSArray<id> *)optionalArray
optionalBoolean:(nullable NSNumber *)optionalBoolean
optionalInt:(nullable NSNumber *)optionalInt
optionalNumber:(nullable NSNumber *)optionalNumber
optionalObject:(nullable SERIALIZABLE_DICT)optionalObject
optionalString:(nullable NSString *)optionalString
optionalStringWithRegex:(nullable NSString *)optionalStringWithRegex {
  SEGOptionalArrayWithPropertiesItem *object = [[SEGOptionalArrayWithPropertiesItem alloc] init];
  object.optionalAny = optionalAny;
  object.optionalArray = optionalArray;
  object.optionalBoolean = optionalBoolean;
  object.optionalInt = optionalInt;
  object.optionalNumber = optionalNumber;
  object.optionalObject = optionalObject;
  object.optionalString = optionalString;
  object.optionalStringWithRegex = optionalStringWithRegex;
  return object;
}

-(nonnull SERIALIZABLE_DICT) toDictionary {
  NSMutableDictionary *properties = [[NSMutableDictionary alloc] init];
  properties[@"optional any"] = self.optionalAny == nil ? [NSNull null] : self.optionalAny;
  properties[@"optional array"] = self.optionalArray == nil ? [NSNull null] : [SEGTypewriterUtils toSerializableArray:self.optionalArray];
  properties[@"optional boolean"] = self.optionalBoolean == nil ? [NSNull null] : self.optionalBoolean;
  properties[@"optional int"] = self.optionalInt == nil ? [NSNull null] : self.optionalInt;
  properties[@"optional number"] = self.optionalNumber == nil ? [NSNull null] : self.optionalNumber;
  properties[@"optional object"] = self.optionalObject == nil ? [NSNull null] : self.optionalObject;
  properties[@"optional string"] = self.optionalString == nil ? [NSNull null] : self.optionalString;
  properties[@"optional string with regex"] = self.optionalStringWithRegex == nil ? [NSNull null] : self.optionalStringWithRegex;

  return properties;
}

@end
