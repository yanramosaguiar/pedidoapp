angular.module('starter').controller('HomeController', function ($scope, ProdutosService) {
    ProdutosService.lista().then(function(dados) {
        $scope.bolos = dados;
    });
});

angular.module('starter').controller('DetalheController', function($scope, $stateParams, ProdutosService) {
    ProdutosService.lista().then(function(dados) {
        $scope.bolo = dados[$stateParams.boloID];
    });
});

angular.module('starter').controller('PedidoController', function($scope, $stateParams, $http, $state, $ionicPopup, $ionicLoading, ProdutosService) {
    ProdutosService.lista().then(function(dados) {
        $scope.bolo = dados[$stateParams.boloID];
    });

    $scope.dados = {};

    $scope.fecharPedido = function() {
        $ionicLoading.show();

        $http.get('http://cozinhapp.sergiolopes.org/novo-pedido', {
            params: {
                pedido: $scope.bolo.nome,
                info: $scope.dados.nome + ' (' + $scope.dados.telefone + ') - ' + $scope.dados.endereco
            }
        }).then(function() {
            $ionicPopup.alert({
                title: 'Pedido confirmado',
                template: 'Daqui a pouco chega :)'
            }).then(function() {
                $state.go('home');
            });
        }).catch(function(erro) {
            $ionicPopup.alert({
                title: 'Erro no pedido',
                template: erro.data + '. Deu ruim!'
            });
        }).finally(function() {
            $ionicLoading.hide();
        });
    };
});