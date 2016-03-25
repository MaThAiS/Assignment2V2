﻿// Code goes here

(function () {

    var app = angular.module("choicesViewer");

    var AccountController = function ($scope, $location, AccountService) {

        //Scope Declaration
        $scope.responseData = "";

        $scope.userName = "";

        $scope.userRegistrationUsername
        $scope.userRegistrationEmail = "";
        $scope.userRegistrationPassword = "";
        $scope.userRegistrationConfirmPassword = "";

        $scope.userLoginEmail = "";
        $scope.userLoginPassword = "";

        $scope.accessToken = "";
        $scope.refreshToken = "";

        $scope.registerUser = function () {

            $scope.responseData = "";

            //The User Registration Information
            var userRegistrationInfo = {
                Username: $scope.userRegistrationUsername,
                Email: $scope.userRegistrationEmail,
                Password: $scope.userRegistrationPassword,
                ConfirmPassword: $scope.userRegistrationConfirmPassword
            };

            var promiseregister = AccountService.register(userRegistrationInfo);

            promiseregister.then(function (resp) {
                $scope.responseData = "User is Successfully";
                $scope.userRegistrationUsername
                $scope.userRegistrationEmail = "";
                $scope.userRegistrationPassword = "";
                $scope.userRegistrationConfirmPassword = "";
            }, function (err) {
                $scope.responseData = "Error " + err.status;
            });
        };

        $scope.redirect = function () {
            window.location.href = '/showAll';
        };

        //Function to Login. This will generate Token 
        $scope.login = function () {
            //This is the information to pass for token based authentication
            var userLogin = {
                grant_type: 'password',
                username: $scope.userName,
                password: $scope.userLoginPassword
            };

            var promiselogin = AccountService.login(userLogin);

            promiselogin.then(function (resp) {

                $scope.userName = resp.data.userName;
                //Store the token information in the SessionStorage
                //So that it can be accessed for other views
                sessionStorage.setItem('userName', resp.data.userName);
                sessionStorage.setItem('accessToken', resp.data.access_token);
                sessionStorage.setItem('refreshToken', resp.data.refresh_token);
                window.location.href = '/showAll';
            }, function (err) {

                $scope.responseData = "Error " + err.status;
            });

        };
    };

    app.controller("AccountController", AccountController);
}());