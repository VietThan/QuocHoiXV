var subjectObject = {
    "Hà Nội": {
      "Hoàn Kiếm": [1],
      "Long Biên": [1],
      "Đông Anh": [1],
      "Ba Đình": [2],
      "Đống Đa": [2],
      "Hai Bà Trưng": [2],
      "Cầu Giấy": [3],
      "Nam Từ Liêm": [3],
      "Thanh Xuân": [3],
      "Hoàng Mai": [4],
      "Gia Lâm": [4],
      "Tây Hồ": [5],
      "Bắc Từ Liêm": [5],
      "Hoài Đức": [5],
      "Hà Đông": [6],
      "Thanh Trì": [6],
      "Thanh Oai": [6],
      "Sơn Tây": [7],
      "Phúc Thọ": [7],
      "Ba Vì": [7],
      "Đan Phương": [7],
      "Quốc Oai": [8],
      "Chương Mỹ": [8],
      "Thạch Thất": [8],
      "Ứng Hoà": [9],
      "Mỹ Đức": [9],
      "Phú Xuyên": [9],
      "Thường Tín": [9],
      "Sóc Sơn": [10],
      "Mê Linh": [10]
    },
  }
  window.onload = function() {
    var provinceSel = document.getElementById("province");
    var wardSel = document.getElementById("ward");
    var result = document.getElementById("result");
  
    for (var x in subjectObject) {
      provinceSel.options[provinceSel.options.length] = new Option(x, x);
    }
  
    provinceSel.onchange = function() {
      //empty result, and Wards- dropdowns
      wardSel.length = 1;
      result.value = ""
      //display correct values
      for (var y in subjectObject[this.value]) {
        wardSel.options[wardSel.options.length] = new Option(y, y);
      }
    }
    wardSel.onchange = function() {
      //empty result dropdown
      result.value = "";
      //display correct values
      var z = subjectObject[provinceSel.value][this.value];
      result.innerHTML = "Bạn được đại diện bởi đơn vị đại biểu:<br>&emsp;" + provinceSel.value + " " + z
    }
  }