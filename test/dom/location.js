var location = require('../../lib/dom/location');

describe('dom.location', function() {
  var window;
  beforeEach(function() {
    window = {
      document: {}
    };
  });

  it('should generate location', function() {
    location(window, 'http://foo.bar/foo/bar?baz=bat&boz=');
    window.location.host.should.equal('foo.bar');
    window.location.path.should.equal('/foo/bar');
    window.location.origin.should.equal('http://foo.bar');
    window.location.hash.should.equal('');
    (window.location+'').should.equal('http://foo.bar/foo/bar?baz=bat&boz=');
  });
  it('should handle ports', function() {
    location(window, 'https://foo.bar:8080/foo/bar?baz=bat&boz=');
    window.location.host.should.equal('foo.bar:8080');
    window.location.origin.should.equal('https://foo.bar:8080');
  });

  it('should redirect on assign()', function() {
    var spy = this.spy();

    location(window, 'https://foo.bar:8080/foo/bar?baz=bat&boz=', spy);
    window.location.assign('/foo');

    spy.should.have.been.calledWith('/foo');
  });

  it('should redirect on window field assign', function() {
    var spy = this.spy();

    location(window, 'https://foo.bar:8080/foo/bar?baz=bat&boz=', spy);
    window.location = '/foo';

    spy.should.have.been.calledWith('/foo');
  });
  it('should redirect on document field assign', function() {
    var spy = this.spy();

    location(window, 'https://foo.bar:8080/foo/bar?baz=bat&boz=', spy);
    window.location = '/foo';

    spy.should.have.been.calledWith('/foo');
  });
});
