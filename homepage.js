const provinceURL = 'https://vietthan.github.io/VietnamAPI/api/vietnam/provinces.json';

window.onload = function(){
  var provinceSel = document.getElementById("province");

  let provincesData
  fetch(provinceURL).then(function (provinceResponse) {
    // The API call was successful!
    if (provinceResponse.ok) {
      return provinceResponse.json();
    } else {
      return Promise.reject(provinceResponse);
    }
  }).then(function (provinceJson) {
    // Populate province data
    provincesData = provinceJson;
    var provinceSel = document.getElementById("province");
    for (var province in provincesData) {
      provinceSel.options[provinceSel.options.length] = new Option(province, province);
    }
  }).catch(function (provinceErr) {
    // There was an error
    console.warn('Something went wrong while working with provinces.', provinceErr);
  });

  let districtsData;
  provinceSel.onchange = function () {
    const districtsURL = 'https://vietthan.github.io/VietnamAPI/api/vietnam/provinces/districts/'
    let districtURL = districtsURL + provincesData[this.value] + '.json'
    console.log(districtURL)
  
    fetch(districtURL).then(function (districtResponse) {
    // The API call was successful!
    if (districtResponse.ok) {
      return districtResponse.json();
    } else {
      return Promise.reject(districtResponse);
    }
    }).then(function (districtsJson) {
      var wardSel = document.getElementById("ward");
      // empty result dropdown
      wardSel.length = 1;
      wardSel.value = "";

      districtsData = districtsJson;
    
      for (var district in districtsData['dictDistricts']) {
        wardSel.options[wardSel.options.length] = new Option(district, district);
      }
    }).catch(function (districtErr) {
      // There was an error
      console.warn('Something went wrong with districts.', districtErr);
    });
  }

}





/*
districtsURL = 'https://vietthan.github.io/VietnamAPI/api/vietnam/provinces/districts/';
  window.onload = function() {
    let provinceData;
    fetch(provinceURL).then(function (response) {
      // The API call was successful!
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    }).then(function (provinceJson) {
      // This is the JSON from our response
      provinceData = provinceJson;

      var provinceSel = document.getElementById("province");
    
      for (var x in provinceData) {
        console.log(x)
        provinceSel.options[provinceSel.options.length] = new Option(x, x);
      }
      provinceSel.onchange = function() {
        var wardSel = document.getElementById("ward");
            //empty result, and Wards- dropdowns
           wardSel.length = 1;

        let districtData;
        let districtURL = districtsURL + provinceData[this.value] + '.json';
        console.log('district url is')
        console.log(districtURL)
        fetch(districtURL).then(function (response) {
          // The API call was successful!
          if (response.ok) {
            return response.json();
          } else {
            return Promise.reject(response);
          }
        }).then(function (provinceJson) {
          // This is the JSON from our response
          provinceData = provinceJson;
    
          
        }).catch(function (err) {
          // There was an error
          console.warn('Something went wrong.', err);
        });
    


            //display correct values
            for (var y in districtData) {
              wardSel.options[wardSel.options.length] = new Option(y, y);
            }
          }
    }).catch(function (err) {
      // There was an error
      console.warn('Something went wrong.', err);
    });



    var provinceSel = document.getElementById("province");
    var wardSel = document.getElementById("ward");
    var result = document.getElementById("result");
  
    for (var x in provinceData) {
      console.log(x)
      provinceSel.options[provinceSel.options.length] = new Option(x, x);
    }
  

  //   wardSel.onchange = function() {
  //     //empty result dropdown
  //     result.value = "";
  //     //display correct values
  //     var z = subjectObject[provinceSel.value][this.value];
  //     result.innerHTML = "Bạn được đại diện bởi đơn vị đại biểu:<br>&emsp;" + provinceSel.value + " " + z
  //   }
  }

  */