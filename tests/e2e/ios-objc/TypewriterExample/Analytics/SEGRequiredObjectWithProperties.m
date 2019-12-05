/**
 * This client was automatically generated by Segment Typewriter. ** Do Not Edit **
 */

#import "SEGRequiredObjectWithProperties.h"

@implementation SEGRequiredObjectWithProperties

+(nonnull instancetype) initWithRequiredAny:(nullable id)requiredAny
requiredArray:(nullable NSArray<id> *)requiredArray
requiredBoolean:(nullable NSNumber *)requiredBoolean
requiredInt:(nullable NSNumber *)requiredInt
requiredNumber:(nullable NSNumber *)requiredNumber
requiredObject:(nullable SERIALIZABLE_DICT)requiredObject
requiredString:(nullable NSString *)requiredString
requiredStringWithRegex:(nullable NSString *)requiredStringWithRegex {
  SEGRequiredObjectWithProperties *object = [[SEGRequiredObjectWithProperties alloc] init];
  object.requiredAny = requiredAny;
  object.requiredArray = requiredArray;
  object.requiredBoolean = requiredBoolean;
  object.requiredInt = requiredInt;
  object.requiredNumber = requiredNumber;
  object.requiredObject = requiredObject;
  object.requiredString = requiredString;
  object.requiredStringWithRegex = requiredStringWithRegex;
  return object;
}

-(nonnull SERIALIZABLE_DICT) toDictionary {
  NSMutableDictionary *properties = [[NSMutableDictionary alloc] init];
  properties[@"required any"] = self.requiredAny == nil ? [NSNull null] : self.requiredAny;
  properties[@"required array"] = self.requiredArray == nil ? [NSNull null] : [SEGTypewriterUtils toSerializableArray:self.requiredArray];
  properties[@"required boolean"] = self.requiredBoolean == nil ? [NSNull null] : self.requiredBoolean;
  properties[@"required int"] = self.requiredInt == nil ? [NSNull null] : self.requiredInt;
  properties[@"required number"] = self.requiredNumber == nil ? [NSNull null] : self.requiredNumber;
  properties[@"required object"] = self.requiredObject == nil ? [NSNull null] : self.requiredObject;
  properties[@"required string"] = self.requiredString == nil ? [NSNull null] : self.requiredString;
  properties[@"required string with regex"] = self.requiredStringWithRegex == nil ? [NSNull null] : self.requiredStringWithRegex;

  return properties;
}

@end
