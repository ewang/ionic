describe('Ionic Scroll Directive', function() {
  var compile, element, scope;

  beforeEach(module('ionic'));

  beforeEach(inject(function($compile, $rootScope, $timeout, $window) {
    compile = $compile;
    scope = $rootScope;
    timeout = $timeout;
    window = $window;
    ionic.Platform.setPlatform('Android');
    spyOn(ionic.Platform, 'ready').andCallFake(function(cb) {
      cb();
    });
  }));

  it('Has $ionicScroll controller', function() {
    element = compile('<ion-scroll></ion-scroll>')(scope);
    expect(element.controller('$ionicScroll').element).toBe(element[0]);
  });

  it('Has scroll-view class', function() {
    element = compile('<ion-scroll></ion-scroll>')(scope);
    expect(element.hasClass('scroll-view')).toBe(true);
  });

  it('should add padding classname', function() {
    element = compile('<ion-scroll padding="true"></ion-scroll>')(scope);
    scope.$apply();
    expect(element.children().eq(0).hasClass('padding')).toEqual(true);
    var scrollElement = element.find('.scroll');
    expect(scrollElement.hasClass('padding')).toEqual(true);
  });

  it('should pass attr.controllerBind ionicScrollController', function() {
    var element = compile('<ion-scroll controller-bind="scrolly">')(scope);
    scope.$apply();
    expect(scope.scrolly).toBe(element.controller('$ionicScroll'));
  });

  it('Should set start x and y', function() {
    element = compile('<ion-content start-x="100" start-y="300" has-header="true"></ion-scroll>')(scope);
    scope.$apply();
    var scrollView = scope.$ionicScrollController.scrollView;
    var vals = scrollView.getValues();
    expect(vals.left).toBe(100);
    expect(vals.top).toBe(300);
  });
});
