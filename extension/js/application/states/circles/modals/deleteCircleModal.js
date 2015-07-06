app.controller('deleteProductModalCtrl', function($scope, AdminFactory, $modalInstance, product, products, $state) {
  // console.log('hit modal controller',product)
  $scope.product = product;
  $scope.products = products;

  $scope.deleteProductConf = function(product) {
    // console.log('hit delete conf', product)
    $scope.showAlert = true;
    AdminFactory.deleteProduct(product._id);
    console.log('scope.products', $scope.products)
  }

  $scope.close = function () {
    $modalInstance.close();
    $state.go('adminOnly.products')
  }

});
