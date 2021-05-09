
  const provinceURL = 'https://vietthan.github.io/VietnamAPI/api/vietnam/provinces.json';
  const districtsURL = 'https://vietthan.github.io/VietnamAPI/api/vietnam/provinces/districts/'
  const unitsURL = 'https://vietthan.github.io/VietnamAPI/api/vietnam/congress/districts/'

window.onload = function(){
  var provinceSel = document.getElementById("province");
  var districtSel = document.getElementById("district");
  var result = document.getElementById("result");

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
    let districtURL = districtsURL + provincesData[this.value] + '.json'
  
    fetch(districtURL).then(function (districtResponse) {
    // The API call was successful!
    if (districtResponse.ok) {
      return districtResponse.json();
    } else {
      return Promise.reject(districtResponse);
    }
    }).then(function (districtsJson) {
      // empty result dropdown
      districtSel.length = 1;
      districtSel.value = "";

      districtsData = districtsJson;
    
      for (var district in districtsData['dictDistricts']) {
        districtSel.options[districtSel.options.length] = new Option(district, district);
      }
    }).catch(function (districtErr) {
      // There was an error
      console.warn('Something went wrong with districts.', districtErr);
    });
  };

  let resultData;
  districtSel.onchange = function(){
    let resultURL = unitsURL + districtsData['dictDistricts'][this.value] + '.json'
    fetch(resultURL).then(function (unitDistrictResponse) {
      // The API call was successful!
      if (unitDistrictResponse.ok) {
        return unitDistrictResponse.json();
      } else {
        return Promise.reject(unitDistrictResponse);
      }
      }).then(function (resultJson) {
        // empty result
        result.value = "";
  
        resultData = resultJson;

        var strProvinceName = resultData['strProvinceName'];
        strProvinceName = strProvinceName.replace("Tỉnh ", "").replace("TP. ", "")
        let intProvinceUnitKey = resultData['intProvinceUnitKey'];
        let intCongressKey = resultData['intCongressKey'];
        let intRepCount = resultData['intRepCount'];
    

        result.innerHTML = "Bạn được đại diện bởi đơn vị đại biểu:<br>&emsp;" + strProvinceName + " " 
        + intProvinceUnitKey + "<br>Đơn vị này có " + intRepCount + " đại biểu"
        + "<br>Và là đơn vị số " + intCongressKey + " trong danh sách quốc hội";
      }).catch(function (districtErr) {
        // There was an error
        console.warn('Something went wrong with districts.', districtErr);
      });

  }

}