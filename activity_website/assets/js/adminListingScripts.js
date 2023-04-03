// ==================== ADMIN isting modal

$('#addProduct').on('click', () => {
  var iCode = $("#pCode").val("");
  var iName = $("#pName").val('');
  var iPrice = $("#pPrice").val('');
  var iQty = $("#pQty").val('');
  var iDescription = $("#pDescription").val('');
  var iImage = $("#pImage").val('');
  $('#addtoListModal').modal('show');
});

$("#ListProduct").on('click', () => {
  iCode = $("#pCode").val();
  iName = $("#pName").val();
  iPrice = $("#pPrice").val();
  iQty = $("#pQty").val();
  iDescription = $("#pDescription").val();
  iImage = $("#pImage").val();
//image still in develoipmeneent

  // var sJsonProduct =   new FormData();
  // sJsonProduct.append('code', iCode);
  // sJsonProduct.append('name', iName);
  // sJsonProduct.append('price', iPrice);
  // sJsonProduct.append('qty', iQty);
  // sJsonProduct.append('description', iDescription);
  // sJsonProduct.append('image', iImage);

//   {
//     code: iCode,
//     name: iName,
//     price: iPrice,
//     qty: iQty,
//     description: iDescription,
//     image: iImage,
// };

var sJsonProduct = {
      code: iCode,
      name: iName,
      price: iPrice,
      qty: iQty,
      description: iDescription,
      image: iImage,
  };

  $.ajax({
      type: 'POST',
      url: "/activity_website/controllers/admin/admin_list_product.php",
      data: sJsonProduct,
      success: (result) => {
          if( result == "Product Listed!") {
            fetch();
            $('#addtoListModal').modal('hide');
        
            console.log(result);

              // window.location = "/activity_website/controllers/OTP.php";
          } else if ( result == "Incomplete") {
              alert("Please fill out all fields");
          } else if ( result == "Failed Listing!") {
              alert("Failed Listing!");
          }else {
              console.log(result);
          }  
      }
  });

});

$( document ).ready( fetch()

//   () => {

//   $.ajax({
//     type: 'POST',
//     url: "/activity_website/controllers/admin_listing_fetch.php",
//     success: (result) => {
//         if( result == "Record successfully saved!") {

//         } else if ( result == "Incomplete product description") {
//             alert("Please fill out product all details");
//         } else {
//           $("").innerHTML = result;
//         }  
//     }
// });

// }

);

// function adminspinshow(){
//   $('.sppinnermodal').modal('show');
// }
// function adminspinhide(){
//   $('.sppinnermodal').modal('show');
// }

function fetch() {

$.ajax({
    type: 'POST',
    url: "/activity_website/controllers/admin/admin_listing_fetch.php",
    beforeSend: function (){
      var x = document.querySelector('.sppinnermodal');
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    },
    success: (result) => {
        if (result == "error") {
            alert("Please call system admnistrator");
        } else {
            $("#admin_listedProducts").html(result);
        }
    },
    complete: function(){
      var x = document.querySelector('.sppinnermodal');
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }    },
});
}

function archive(nId) {
  var nIndex = {
      index: nId
      };
  // console.log(nIndex);
  $.ajax({
      type: 'POST',
      url: "/activity_website/controllers/admin/archive_product.php",
      data: nIndex,
      success: (result) => {
          if (result == "error") {
              alert("Please call system admnistrator");
          } else {
              fetch();
          }
      }
  });
}

function modify(nId) {
  var hiddenIndex = $("#indexer").val(nId);
  console.log(hiddenIndex);

      $.ajax({
      type: 'POST',
      url: "/activity_website/controllers/admin/modify_product.php",
      data: {nid: nId},
      success: (result) => {
          if (result == "error") {
              alert("Please call system admnistrator");
          } else {
              var objRes = JSON.parse(result);
              sPcode = $("#productCode").val(objRes.ProductCode);
              sPname = $("#productName").val(objRes.ProductName);
              sPprice = $("#productPrice").val(objRes.ProductPrice);
              sPquantity = $("#productQuantity").val(objRes.ProductQuantity);
              sPdescription = $("#productDescription").val(objRes.ProductDescription);
              sPphoto = $("productPhoto").val(objRes.ProductPhoto)
              
              $('#modifyModal').modal('show');
              
              $("#Modify").on('click', () => {

                  var nIndex = $("#indexer").val();
                  var sPcode = $("#productCode").val();
                  var sPname = $("#productName").val();
                  var sPprice = $("#productPrice").val();
                  var sPquantity = $("#productQuantity").val();
                  var sPdescription = $("#productDescription").val();
                  var sPphoto = $("#productPhoto").val();
              
                  var sJsonData = {
                      index: nIndex,
                      pcode: sPcode,
                      pname: sPname,
                      pprice: sPprice,
                      pquantity: sPquantity,
                      pdescription: sPdescription,
                      pphoto: sPphoto
                  }
                  
                  $.ajax({
                      type: 'POST',
                      url: "/activity_website/controllers/admin/modify_save.php",
                      data: sJsonData,
                      success: (result) => {
                          if (result == "updated") {
                            $('#modifyModal').modal('hide');
                            fetch();
                          }else {
                            alert(result);
                          }
                      }
                  });

              });
          }
      }
  });

}