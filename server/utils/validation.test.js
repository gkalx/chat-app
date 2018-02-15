var expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString',()=>{
  it('should reject non-string values',()=>{
    var from = 33;
    var text = 'this is some testing text';
    var object = {from,text};
    
    var genMsg = isRealString(from);
    var genMsg2 = isRealString(object);
    
    expect(genMsg).toBeFalsy();
    expect(genMsg).toBe(false);
    expect(genMsg2).toBeFalsy();
    expect(genMsg2).toBe(false);
    expect(typeof genMsg2).toBe('boolean');

  });


  it('should reject string with only spaces values',()=>{
        var textSpaces = '       ';
        var genMsg = isRealString(textSpaces);
        expect(genMsg).toBe(false);
  });
  
  it('should allow string with non-space characters',()=>{
        var passingValue = '   alex    ';
        var genMsg = isRealString(passingValue);
        expect(genMsg).toBeTruthy();
        expect(genMsg).toBe(true);
  });  
  
});