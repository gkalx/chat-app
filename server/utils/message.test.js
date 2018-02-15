var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage',()=>{
  it('should generate a correct Message object',()=>{
    var from = 'alex';
    var text = 'this is some testing text';
    var genMsg = generateMessage(from,text);
    expect(genMsg.from).toBe(from);
    expect(genMsg.text).toBe(text);
    expect(typeof genMsg.createdAt).toBe('number');
    expect(genMsg).toMatchObject({from,text});
  });
});

describe('generateLocationMessage',()=>{
  it('should generate a correct Location Message object',()=>{
    var from = 'alex';
    var latitude = 37.8354825;
    var longitute = 23.7785741;
    var url = 'https://www.google.com/maps?q=37.8354825,23.7785741';
    var genMsg = generateLocationMessage(from,latitude,longitute);
//    expect(genMsg.from).toBe(from);
//    expect(genMsg.url).toBe(url);
    expect(typeof genMsg.createdAt).toBe('number');
    expect(genMsg).toMatchObject({from,url});
  });
});