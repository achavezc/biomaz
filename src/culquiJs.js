

 function callMostrarBlockFunction() {  
   window.angularComponentReference.mostrarBlockFunction();  
 } 

 function callOcultarBlockFunction() {  
    window.angularComponentReference.ocultarBlockFunction();  
  } 
  function callbtenerUsuarioFunction() {  
    window.angularComponentReference.obtenerUsuarioFunction();  
  } 
 
  var miembroId = 0;

 function culqi() {
   
    if (Culqi.token)
     { // ¡Token creado exitosamente!
        // Get the token ID:
        
         miembroId = $('#hide').val();
        
              
        //Mostrarblock();
        //debugger
         callMostrarBlockFunction();
        
        $.ajax({
            //url: 'http://manuelruizbaca11-001-site1.htempurl.com/api/OperacionPago/PagarOrdenCulqui',
            url: 'http://mruizb-001-site2.htempurl.com/api/OperacionPago/PagarOrdenCulqui',
            
            //url: 'http://localhost:5000/api/OperacionPago/PagarOrdenCulqui',
            data: JSON.stringify({
                "Token": Culqi.token.id,
                "MiembroId": miembroId
            }),
            contentType: "application/json",
            headers: {
                "Accept": "application/json"
            },
            error: function (err) 
            {
                
                alert('Lo sentimos, a ocurrido un error');
                callOcultarBlockFunction();
            },
            dataType: 'json',
            success: function (data) 
            {   
                //debugger

                callOcultarBlockFunction();

                if(data.Estado=='01')
                {
                //alert("Pago exitoso.")
                location.href = '/checkout/payment-processsed';
                }
                else
                {
                    alert("Pago no exitoso.")
                }
                 
            },
            type: 'POST'
        });

    } else
     { 
        // ¡Hubo algún problema!
        // Mostramos JSON de objeto error en consola
         callOcultarBlockFunction();
        
        console.log(Culqi.error);
        alert(Culqi.error.mensaje);
    }
};  



   
     /* function culqi() 
    {

        if (Culqi.token) 
        { // ¡Token creado exitosamente!
            // Get the token ID:
            var token = Culqi.token.id;
            
            $.ajax({
                url: 'https://api.culqi.com/v2/charges',
                data: JSON.stringify({
                    "source_id": Culqi.token.id,
                    "amount": 2300,
                    "currency_code": "PEN",
                    "email": Culqi.token.email
                }),
                contentType: "application/json",
                headers: {
                    "Accept": "application/json",
                    "authorization": "Bearer sk_test_MgejmQQ5E86a82wn"
                },
                error: function (err) {
                    alert('Lo sentimos, a ocurrido un error');
                },
                dataType: 'json',
                success: function (data) {
                    alert("pago exitoso")
                },
                type: 'POST'
            });

        } else { // ¡Hubo algún problema!
            // Mostramos JSON de objeto error en consola
            console.log(Culqi.error);
            alert(Culqi.error.mensaje);
        }
    }; */
 
