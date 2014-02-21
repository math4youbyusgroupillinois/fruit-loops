var $ = require('../../lib/jquery'),
    Cheerio = require('cheerio'),
    dom = require('../../lib/dom');

describe('cheerio-shim', function() {
  var window,
      inst;
  beforeEach(function() {
    window = {
      toString: function() {
        return '[object Window]';
      },
      nextTick: function(callback) {
        callback();
      }
    };
    window.self = window;
    dom.document(window);
    dom.navigator(window, {userAgent: ''});
    inst = $(window, '<body><div></div><div></div></body>');
  });

  describe('innerHTML', function() {
    it('should retreive html', function() {
      var $el = inst.$('body');
      $el.innerHTML.should.equal('<div></div><div></div>');
    });
    it('should set html', function() {
      var $el = inst.$('body');
      $el.innerHTML = '<div>winning</div>';
      $el.html().should.equal('<div>winning</div>');
    });
  });


  describe('#animate', function() {
    it('should set css and callback', function(done) {
      var $el = inst.$('body');
      $el.animate({display: 'none', top: '100px'}, function() {
        $el.css().should.eql({
          display: 'none',
          top: '100px'
        });
        done();
      });
    });
    it('should set css and callback options', function(done) {
      var $el = inst.$('body');
      $el.animate({display: 'none', top: '100px'}, {
        callback: function() {
          $el.css().should.eql({
            display: 'none',
            top: '100px'
          });
          done();
        }
      });
    });
  });

  describe('#get', function() {
    it('should deref individual elements', function() {
      var els = inst.$('div');
      els.eq(1)[0].should.equal(els[1]);
    });
  });

  describe('#forEach', function() {
    it('should iterate', function() {
      var spy = this.spy(),
          els = inst.$('div');

      els.forEach(spy);

      spy.should.have.been.calledTwice;
      spy.should.have.been.calledOn(els);
    });
  });

  describe('#toggle', function() {
    it('should toggle', function() {
      var $el = inst.$('body');
      should.not.exist($el.css('display'));

      $el.toggle();
      $el.css('display').should.equal('none');

      $el.toggle();
      should.not.exist($el.css('display'));
    });
    it('should show', function() {
      var $el = inst.$('body');
      should.not.exist($el.css('display'));

      $el.toggle(true);
      should.not.exist($el.css('display'));
    });
    it('should hide', function() {
      var $el = inst.$('body');
      should.not.exist($el.css('display'));

      $el.toggle(false);
      $el.css('display').should.equal('none');
    });
  });

  describe('#focus', function() {
    it('should apply attr', function() {
      var $el = inst.$('body');
      should.not.exist($el.attr('autofocus'));

      $el.focus();
      $el.attr('autofocus').should.equal('autofocus');

      $el.blur();
      $el.attr('autofocus').should.equal(false);
    });
  });
});
