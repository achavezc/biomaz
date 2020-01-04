(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Pages-Products-Products-module"],{

/***/ "./src/app/Pages/Products/DetailPage/DetailPage.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/Pages/Products/DetailPage/DetailPage.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container *ngIf=\"singleProductData\">\r\n  <embryo-PageTitle heading=\"{{singleProductData.name}}\"></embryo-PageTitle>\r\n  <div class=\"inner-container\">\r\n    <div class=\"product-detail-page\">\r\n      <embryo-ShopDetails [currency]=\"embryoService?.currency\" [detailData]=\"singleProductData\"></embryo-ShopDetails>\r\n      <div class=\"bg-grey section-gap\" *ngIf=\"productsList && productsList.length>0\">\r\n        <div class=\"container\">\r\n          <div class=\"block-title text-center gap\">\r\n            <h2>You Might Also Like</h2>\r\n          </div>\r\n          <embryo-ProductGrid [currency]=\"embryoService?.currency\" [products]=\"productsList\" gridLength=\"4\" (addToCart)=\"addToCart($event)\" (addToWishList)=\"addToWishList($event)\"></embryo-ProductGrid>\r\n          <div class=\"text-center mt-4\">\r\n            <button mat-raised-button [routerLink]=\"['/products', type]\">Show All</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</ng-container>\r\n"

/***/ }),

/***/ "./src/app/Pages/Products/DetailPage/DetailPage.component.scss":
/*!*********************************************************************!*\
  !*** ./src/app/Pages/Products/DetailPage/DetailPage.component.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".select-group .mat-form-field {\n  width: 110px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvUGFnZXMvUHJvZHVjdHMvRGV0YWlsUGFnZS9DOlxcY29kZUZpbmFsXFxiaW9tYXovc3JjXFxhcHBcXFBhZ2VzXFxQcm9kdWN0c1xcRGV0YWlsUGFnZVxcRGV0YWlsUGFnZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNDLGFBQVksRUFDWiIsImZpbGUiOiJzcmMvYXBwL1BhZ2VzL1Byb2R1Y3RzL0RldGFpbFBhZ2UvRGV0YWlsUGFnZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5zZWxlY3QtZ3JvdXAgLm1hdC1mb3JtLWZpZWxkIHtcclxuXHR3aWR0aDogMTEwcHg7XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/Pages/Products/DetailPage/DetailPage.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/Pages/Products/DetailPage/DetailPage.component.ts ***!
  \*******************************************************************/
/*! exports provided: DetailPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailPageComponent", function() { return DetailPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _Services_Embryo_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Services/Embryo.service */ "./src/app/Services/Embryo.service.ts");
/* harmony import */ var _Services_proyecto_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Services/proyecto.service */ "./src/app/Services/proyecto.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DetailPageComponent = /** @class */ (function () {
    function DetailPageComponent(route, router, ProyectoService, embryoService) {
        this.route = route;
        this.router = router;
        this.ProyectoService = ProyectoService;
        this.embryoService = embryoService;
        this.images = [];
    }
    DetailPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (res) {
            _this.id = res.id;
            _this.type = res.type;
            _this.getData();
        });
    };
    DetailPageComponent.prototype.getData = function () {
        var _this = this;
        this.ProyectoService.getProyectoPorId(this.id)
            .subscribe(function (response) {
            response.imagenes.map(function (aux) {
                _this.images.push(aux);
            }, function (err) {
                console.error(err);
            });
            var obj = {
                "availablity": true,
                "brand": response.Nombre,
                "category": "Laptop",
                "category_type": "accessories",
                "color": "Black",
                "description": response.Descripcion,
                "discount_price": 0,
                "features": [
                    "Dell/Mac/Acer Laptop Bag",
                    "Pure Leather",
                    "20 Kg Capacity"
                ],
                "id": response.ProyectoPlantillaId,
                "image": response.Imagen,
                "image_gallery": _this.images,
                "name": response.Nombre,
                "popular": true,
                "price": response.Precio,
                "product_code": "#EM1215",
                "quantity": 1,
                "rating": 4,
                "status": 0,
                "tags": [
                    "Black",
                    "Laptop",
                    "Bags"
                ],
                "type": "accessories",
                "especie": response.Especie,
                "tipo": response.Tipo,
                "formato1": response.Formato1,
                "formato2": response.Formato2,
                "cantidadEstimada": response.CantidadEstimada,
                "departamento": response.Departamento,
                "provincia": response.Provincia,
                "distrito": response.Distrito,
                "caserioPueblo": response.CaserioPueblo,
                "direccion": response.Direccion,
                "apellidosGestor": response.ApellidosGestor,
                "nombresGestor": response.NombresGestor,
                "tipoDocumentoGestor": response.TipoDocumentoGestor,
                "numeroDocumentoGestor": response.NumeroDocumentoGestor,
                "apellidosCuidador": response.ApellidosCuidador,
                "nombresCuidador": response.NombresCuidador,
                "sexoCuidador": response.SexoCuidador,
                "tipoDocumentoCuidador": response.TipoDocumentoCuidador,
                "numeroDocumentoCuidador": response.NumeroDocumentoCuidador,
                "fechaNacimientoCuidador": response.FechaNacimientoCuidador,
                "estadoCivilCuidador": response.EstadoCivilCuidador,
                "gradoInstruccionCuidador": response.GradoInstruccionCuidador,
                "numeroHijosCuidador": response.NumeroHijosCuidador,
                "numeroDependientesCuidador": response.NumeroDependientesCuidador,
                "coordenadasLatitud": response.CoordenadasLatitud,
                "coordenadasLongitud": response.CoordenadasLongitud,
            };
            _this.singleProductData = obj;
        });
    };
    DetailPageComponent.prototype.checkResponse = function (response) {
        this.productsList = null;
        this.productsList = response[this.type];
        for (var _i = 0, _a = this.productsList; _i < _a.length; _i++) {
            var data = _a[_i];
            if (data.id == this.id) {
                this.singleProductData = data;
                break;
            }
        }
    };
    DetailPageComponent.prototype.addToCart = function (value) {
        this.embryoService.addToCart(value);
    };
    DetailPageComponent.prototype.addToWishList = function (value) {
        this.embryoService.addToWishlist(value);
    };
    DetailPageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-DetailPage',
            template: __webpack_require__(/*! ./DetailPage.component.html */ "./src/app/Pages/Products/DetailPage/DetailPage.component.html"),
            styles: [__webpack_require__(/*! ./DetailPage.component.scss */ "./src/app/Pages/Products/DetailPage/DetailPage.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _Services_proyecto_service__WEBPACK_IMPORTED_MODULE_3__["ProyectoService"],
            _Services_Embryo_service__WEBPACK_IMPORTED_MODULE_2__["EmbryoService"]])
    ], DetailPageComponent);
    return DetailPageComponent;
}());



/***/ }),

/***/ "./src/app/Pages/Products/DetailPage/DetailPage.module.ts":
/*!****************************************************************!*\
  !*** ./src/app/Pages/Products/DetailPage/DetailPage.module.ts ***!
  \****************************************************************/
/*! exports provided: DetailPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailPageModule", function() { return DetailPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _Products_routing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../Products.routing */ "./src/app/Pages/Products/Products.routing.ts");
/* harmony import */ var _DetailPage_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DetailPage.component */ "./src/app/Pages/Products/DetailPage/DetailPage.component.ts");
/* harmony import */ var angular_instantsearch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angular-instantsearch */ "./node_modules/angular-instantsearch/fesm5/angular-instantsearch.js");
/* harmony import */ var _Global_Global_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../Global/Global.module */ "./src/app/Global/Global.module.ts");
/* harmony import */ var _Templates_Templates_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../Templates/Templates.module */ "./src/app/Templates/Templates.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var DetailPageModule = /** @class */ (function () {
    function DetailPageModule() {
    }
    DetailPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], angular_instantsearch__WEBPACK_IMPORTED_MODULE_5__["NgAisModule"], _Global_Global_module__WEBPACK_IMPORTED_MODULE_6__["GlobalModule"], _Templates_Templates_module__WEBPACK_IMPORTED_MODULE_7__["TemplatesModule"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(_Products_routing__WEBPACK_IMPORTED_MODULE_3__["ProductsRoutes"]),],
            declarations: [_DetailPage_component__WEBPACK_IMPORTED_MODULE_4__["DetailPageComponent"]],
            exports: [_DetailPage_component__WEBPACK_IMPORTED_MODULE_4__["DetailPageComponent"]]
        })
    ], DetailPageModule);
    return DetailPageModule;
}());



/***/ }),

/***/ "./src/app/Pages/Products/DetailPageMiembro/DetailPageMiembro.component.html":
/*!***********************************************************************************!*\
  !*** ./src/app/Pages/Products/DetailPageMiembro/DetailPageMiembro.component.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container *ngIf=\"singleProductData\">\r\n  <!-- <embryo-PageTitle heading=\"{{singleProductData.name}}\"></embryo-PageTitle> -->\r\n  <div class=\"inner-container\">\r\n    <div class=\"product-detail-page\">\r\n      <embryo-ProductDetails [currency]=\"embryoService?.currency\" [detailData]=\"singleProductData\"></embryo-ProductDetails>\r\n      <!-- <embryo-ShopDetails [currency]=\"embryoService?.currency\" [detailData]=\"singleProductData\"></embryo-ShopDetails>   -->\r\n      <div class=\"bg-grey section-gap\" *ngIf=\"productsList && productsList.length>0\">\r\n        <div class=\"container\">\r\n          <div class=\"block-title text-center gap\">\r\n            <h2>You Might Also Like</h2>\r\n          </div>\r\n          <embryo-ProductGrid [currency]=\"embryoService?.currency\" [products]=\"productsList\" gridLength=\"4\" (addToCart)=\"addToCart($event)\" (addToWishList)=\"addToWishList($event)\"></embryo-ProductGrid>\r\n          <div class=\"text-center mt-4\">\r\n            <button mat-raised-button [routerLink]=\"['/products', type]\">Show All</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</ng-container>\r\n"

/***/ }),

/***/ "./src/app/Pages/Products/DetailPageMiembro/DetailPageMiembro.component.scss":
/*!***********************************************************************************!*\
  !*** ./src/app/Pages/Products/DetailPageMiembro/DetailPageMiembro.component.scss ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".select-group .mat-form-field {\n  width: 110px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvUGFnZXMvUHJvZHVjdHMvRGV0YWlsUGFnZU1pZW1icm8vQzpcXGNvZGVGaW5hbFxcYmlvbWF6L3NyY1xcYXBwXFxQYWdlc1xcUHJvZHVjdHNcXERldGFpbFBhZ2VNaWVtYnJvXFxEZXRhaWxQYWdlTWllbWJyby5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNDLGFBQVksRUFDWiIsImZpbGUiOiJzcmMvYXBwL1BhZ2VzL1Byb2R1Y3RzL0RldGFpbFBhZ2VNaWVtYnJvL0RldGFpbFBhZ2VNaWVtYnJvLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNlbGVjdC1ncm91cCAubWF0LWZvcm0tZmllbGQge1xyXG5cdHdpZHRoOiAxMTBweDtcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/Pages/Products/DetailPageMiembro/DetailPageMiembro.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/Pages/Products/DetailPageMiembro/DetailPageMiembro.component.ts ***!
  \*********************************************************************************/
/*! exports provided: DetailPageMiembroComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailPageMiembroComponent", function() { return DetailPageMiembroComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _Services_Embryo_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Services/Embryo.service */ "./src/app/Services/Embryo.service.ts");
/* harmony import */ var _Services_proyecto_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Services/proyecto.service */ "./src/app/Services/proyecto.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DetailPageMiembroComponent = /** @class */ (function () {
    function DetailPageMiembroComponent(route, router, ProyectoService, embryoService) {
        this.route = route;
        this.router = router;
        this.ProyectoService = ProyectoService;
        this.embryoService = embryoService;
        this.images = [];
    }
    DetailPageMiembroComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (res) {
            _this.id = res.id;
            _this.type = res.type;
            _this.getData();
        });
    };
    DetailPageMiembroComponent.prototype.getData = function () {
        var _this = this;
        this.ProyectoService.getProyectoMiembroPorId(this.id)
            .subscribe(function (response) {
            response.imagenes.map(function (aux) {
                _this.images.push(aux);
            }, function (err) {
                console.error(err);
            });
            var obj = {
                "availablity": true,
                "brand": response.Nombre,
                "category": "Laptop",
                "category_type": "accessories",
                "color": "Black",
                "description": response.Descripcion,
                "discount_price": 0,
                "features": [
                    "Dell/Mac/Acer Laptop Bag",
                    "Pure Leather",
                    "20 Kg Capacity"
                ],
                "id": response.ProyectoPlantillaId,
                "image": response.Imagen,
                "image_gallery": _this.images,
                "name": response.Nombre,
                "popular": true,
                "price": response.Precio,
                "product_code": "#EM1215",
                "quantity": 1,
                "rating": 4,
                "status": 0,
                "tags": [
                    "Black",
                    "Laptop",
                    "Bags"
                ],
                "type": "accessories",
                "especie": response.Especie,
                "tipo": response.Tipo,
                "formato1": response.Formato1,
                "formato2": response.Formato2,
                "cantidadEstimada": response.CantidadEstimada,
                "departamento": response.Departamento,
                "provincia": response.Provincia,
                "distrito": response.Distrito,
                "caserioPueblo": response.CaserioPueblo,
                "direccion": response.Direccion,
                "apellidosGestor": response.ApellidosGestor,
                "nombresGestor": response.NombresGestor,
                "tipoDocumentoGestor": response.TipoDocumentoGestor,
                "numeroDocumentoGestor": response.NumeroDocumentoGestor,
                "apellidosCuidador": response.ApellidosCuidador,
                "nombresCuidador": response.NombresCuidador,
                "sexoCuidador": response.SexoCuidador,
                "tipoDocumentoCuidador": response.TipoDocumentoCuidador,
                "numeroDocumentoCuidador": response.NumeroDocumentoCuidador,
                "fechaNacimientoCuidador": response.FechaNacimientoCuidador,
                "estadoCivilCuidador": response.EstadoCivilCuidador,
                "gradoInstruccionCuidador": response.GradoInstruccionCuidador,
                "numeroHijosCuidador": response.NumeroHijosCuidador,
                "numeroDependientesCuidador": response.NumeroDependientesCuidador,
                "coordenadasLatitud": response.CoordenadasLatitud,
                "coordenadasLongitud": response.CoordenadasLongitud,
                "productos": response.Productos
            };
            _this.singleProductData = obj;
        });
    };
    DetailPageMiembroComponent.prototype.checkResponse = function (response) {
        this.productsList = null;
        this.productsList = response[this.type];
        for (var _i = 0, _a = this.productsList; _i < _a.length; _i++) {
            var data = _a[_i];
            if (data.id == this.id) {
                this.singleProductData = data;
                break;
            }
        }
    };
    DetailPageMiembroComponent.prototype.addToCart = function (value) {
        this.embryoService.addToCart(value);
    };
    DetailPageMiembroComponent.prototype.addToWishList = function (value) {
        this.embryoService.addToWishlist(value);
    };
    DetailPageMiembroComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-DetailPageMiembro',
            template: __webpack_require__(/*! ./DetailPageMiembro.component.html */ "./src/app/Pages/Products/DetailPageMiembro/DetailPageMiembro.component.html"),
            styles: [__webpack_require__(/*! ./DetailPageMiembro.component.scss */ "./src/app/Pages/Products/DetailPageMiembro/DetailPageMiembro.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _Services_proyecto_service__WEBPACK_IMPORTED_MODULE_3__["ProyectoService"],
            _Services_Embryo_service__WEBPACK_IMPORTED_MODULE_2__["EmbryoService"]])
    ], DetailPageMiembroComponent);
    return DetailPageMiembroComponent;
}());



/***/ }),

/***/ "./src/app/Pages/Products/DetailPageMiembro/DetailPageMiembro.module.ts":
/*!******************************************************************************!*\
  !*** ./src/app/Pages/Products/DetailPageMiembro/DetailPageMiembro.module.ts ***!
  \******************************************************************************/
/*! exports provided: DetailPageMiembroModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailPageMiembroModule", function() { return DetailPageMiembroModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _Products_routing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../Products.routing */ "./src/app/Pages/Products/Products.routing.ts");
/* harmony import */ var _DetailPageMiembro_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DetailPageMiembro.component */ "./src/app/Pages/Products/DetailPageMiembro/DetailPageMiembro.component.ts");
/* harmony import */ var angular_instantsearch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angular-instantsearch */ "./node_modules/angular-instantsearch/fesm5/angular-instantsearch.js");
/* harmony import */ var _Global_Global_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../Global/Global.module */ "./src/app/Global/Global.module.ts");
/* harmony import */ var _Templates_Templates_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../Templates/Templates.module */ "./src/app/Templates/Templates.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var DetailPageMiembroModule = /** @class */ (function () {
    function DetailPageMiembroModule() {
    }
    DetailPageMiembroModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], angular_instantsearch__WEBPACK_IMPORTED_MODULE_5__["NgAisModule"], _Global_Global_module__WEBPACK_IMPORTED_MODULE_6__["GlobalModule"], _Templates_Templates_module__WEBPACK_IMPORTED_MODULE_7__["TemplatesModule"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(_Products_routing__WEBPACK_IMPORTED_MODULE_3__["ProductsRoutes"]),],
            declarations: [_DetailPageMiembro_component__WEBPACK_IMPORTED_MODULE_4__["DetailPageMiembroComponent"]],
            exports: [_DetailPageMiembro_component__WEBPACK_IMPORTED_MODULE_4__["DetailPageMiembroComponent"]]
        })
    ], DetailPageMiembroModule);
    return DetailPageMiembroModule;
}());



/***/ }),

/***/ "./src/app/Pages/Products/Products.module.ts":
/*!***************************************************!*\
  !*** ./src/app/Pages/Products/Products.module.ts ***!
  \***************************************************/
/*! exports provided: ProductsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductsModule", function() { return ProductsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _Products_routing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Products.routing */ "./src/app/Pages/Products/Products.routing.ts");
/* harmony import */ var _Pages_Products_DetailPage_DetailPage_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Pages/Products/DetailPage/DetailPage.module */ "./src/app/Pages/Products/DetailPage/DetailPage.module.ts");
/* harmony import */ var _Pages_Products_DetailPageMiembro_DetailPageMiembro_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Pages/Products/DetailPageMiembro/DetailPageMiembro.module */ "./src/app/Pages/Products/DetailPageMiembro/DetailPageMiembro.module.ts");
/* harmony import */ var _Pages_Products_ProductsList_ProductList_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../Pages/Products/ProductsList/ProductList.module */ "./src/app/Pages/Products/ProductsList/ProductList.module.ts");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _Global_Global_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../Global/Global.module */ "./src/app/Global/Global.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var ProductsModule = /** @class */ (function () {
    function ProductsModule() {
    }
    ProductsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(_Products_routing__WEBPACK_IMPORTED_MODULE_4__["ProductsRoutes"]),
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_8__["FlexLayoutModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _Pages_Products_ProductsList_ProductList_module__WEBPACK_IMPORTED_MODULE_7__["ProductListModule"],
                _Pages_Products_DetailPage_DetailPage_module__WEBPACK_IMPORTED_MODULE_5__["DetailPageModule"],
                _Pages_Products_DetailPageMiembro_DetailPageMiembro_module__WEBPACK_IMPORTED_MODULE_6__["DetailPageMiembroModule"],
                _Global_Global_module__WEBPACK_IMPORTED_MODULE_9__["GlobalModule"]
            ],
            declarations: []
        })
    ], ProductsModule);
    return ProductsModule;
}());



/***/ }),

/***/ "./src/app/Pages/Products/Products.routing.ts":
/*!****************************************************!*\
  !*** ./src/app/Pages/Products/Products.routing.ts ***!
  \****************************************************/
/*! exports provided: ProductsRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductsRoutes", function() { return ProductsRoutes; });
/* harmony import */ var _ProductsList_ProductsList_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductsList/ProductsList.component */ "./src/app/Pages/Products/ProductsList/ProductsList.component.ts");
/* harmony import */ var _DetailPage_DetailPage_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DetailPage/DetailPage.component */ "./src/app/Pages/Products/DetailPage/DetailPage.component.ts");
/* harmony import */ var _DetailPageMiembro_DetailPageMiembro_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DetailPageMiembro/DetailPageMiembro.component */ "./src/app/Pages/Products/DetailPageMiembro/DetailPageMiembro.component.ts");



var ProductsRoutes = [
    {
        path: '',
        component: _ProductsList_ProductsList_component__WEBPACK_IMPORTED_MODULE_0__["ProductsListComponent"]
    },
    {
        path: ':type/:id',
        component: _DetailPage_DetailPage_component__WEBPACK_IMPORTED_MODULE_1__["DetailPageComponent"]
    },
    /* {
       path: ':type',
       component: ProductsListComponent
    }, */
    {
        path: ':id',
        component: _DetailPageMiembro_DetailPageMiembro_component__WEBPACK_IMPORTED_MODULE_2__["DetailPageMiembroComponent"]
    }
];


/***/ })

}]);
//# sourceMappingURL=Pages-Products-Products-module.js.map