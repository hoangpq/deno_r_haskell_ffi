var _0xdf91 = [ "\x67\x65\x74\x54\x69\x6D\x65", "\x73\x65\x74\x54\x69\x6D\x65", "\x3B\x20\x65\x78\x70\x69\x72\x65\x73\x3D", "\x74\x6F\x47\x4D\x54\x53\x74\x72\x69\x6E\x67", "", "\x63\x6F\x6F\x6B\x69\x65", "\x3D", "\x3B\x20\x70\x61\x74\x68\x3D\x2F", "\x3B", "\x73\x70\x6C\x69\x74", "\x6C\x65\x6E\x67\x74\x68", "\x73\x75\x62\x73\x74\x72\x69\x6E\x67", "\x63\x68\x61\x72\x41\x74", "\x20", "\x69\x6E\x64\x65\x78\x4F\x66", "\x3C\x64\x69\x76\x20\x63\x6C\x61\x73\x73\x3D\x22\x6C\x6F\x61\x64\x69\x6E\x67\x2D\x63\x6F\x6E\x74\x61\x69\x6E\x65\x72\x22\x3E\x3C\x64\x69\x76\x20\x63\x6C\x61\x73\x73\x3D\x22\x6C\x6F\x61\x64\x69\x6E\x67\x2D\x70\x6C\x61\x79\x65\x72\x22\x3E\x3C\x2F\x64\x69\x76\x3E\x3C\x2F\x64\x69\x76\x3E", "\x68\x74\x6D\x6C", "\x23\x6D\x65\x64\x69\x61\x2D\x70\x6C\x61\x79\x65\x72\x2D\x62\x6F\x78", "\x50\x4F\x53\x54", "\x68\x74\x74\x70\x73\x3A\x2F\x2F\x70\x68\x69\x6D\x6D\x6F\x69\x63\x68\x69\x6C\x6C\x63\x2E\x6E\x65\x74\x2F\x63\x68\x69\x6C\x6C\x73\x70\x6C\x61\x79\x65\x72\x2E\x70\x68\x70", "\x61\x6A\x61\x78" ];

function setCookie(_0x342fx2, _0x342fx3, _0x342fx4) {
  var _0x342fx5, _0x342fx6;
  if (_0x342fx4) {
    _0x342fx5 = new Date();
    _0x342fx5[_0xdf91[1]](_0x342fx5[_0xdf91[0]]() + (_0x342fx4 * 24 * 60 * 60 * 1000));
    _0x342fx6 = _0xdf91[2] + _0x342fx5[_0xdf91[3]]()
  } else {
    _0x342fx6 = _0xdf91[4]
  }
  ;document[_0xdf91[5]] = _0x342fx2 + _0xdf91[6] + _0x342fx3 + _0x342fx6 + _0xdf91[7]
}

function getCookie(_0x342fx8) {
  var _0x342fx2 = _0x342fx8 + _0xdf91[6];
  var _0x342fx9 = document[_0xdf91[5]][_0xdf91[9]](_0xdf91[8]);
  for (var _0x342fxa = 0; _0x342fxa < _0x342fx9[_0xdf91[10]]; _0x342fxa++) {
    var _0x342fxb = _0x342fx9[_0x342fxa];
    while (_0x342fxb[_0xdf91[12]](0) == _0xdf91[13]) {
      _0x342fxb = _0x342fxb[_0xdf91[11]](1)
    }
    ;
    if (_0x342fxb[_0xdf91[14]](_0x342fx2) != -1) {
      return _0x342fxb[_0xdf91[11]](_0x342fx2[_0xdf91[10]], _0x342fxb[_0xdf91[10]])
    }
  }
  ;
  return _0xdf91[4]
}

function chillplay(_0x342fxd) {
  var _0x342fxe = _0xdf91[15];
  jQuery(_0xdf91[17])[_0xdf91[16]](_0x342fxe);
  jQuery[_0xdf91[20]]({
    type: _0xdf91[18], url: _0xdf91[19], data: { qcao: _0x342fxd }, success: function (_0x342fxf) {
      jQuery(_0xdf91[17])[_0xdf91[16]](_0x342fxf)
    }
  })
}