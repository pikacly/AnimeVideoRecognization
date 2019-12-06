/**
 * E.js v5
 * Copyright 2018 Claire
 *localStorage
 */
!function (window, document, $) {
    'use strict';

    var E = {
        version: '4.0.3.180916',
        app: {}
    };

    E.app.name = 'Claire'; // 应用名称

    /**
     * 功能描述：DF数据加密器
     * 代码作者：Claire
     */
    E.encoder = {};

    // 加密方法
    E.encoder.encode = function (data) {
        var a, b;

        if (!data) {
            return '';
        }

        a = {
            '%22': '0',
            '%2C': '1',
            '%3A': '2',
            '%5B': '3',
            '%5D': '4',
            '%7B': '5',
            '%7D': '6'
        };

        b = E.encoder.str_shuffle('^`$<,>@:');
        b = b.split('');

        try {
            return 'df' + window.encodeURIComponent(JSON.stringify(data)).replace(/\%22|\%2C|\%3A|\%5B|\%5D|\%7B|\%7D/g, function (c) {
                return b[a[c]];
            }).replace(/\%/g, b[7]).split('').reverse().join('') + b.join('') + 'wf';
        } catch (e) {
            console.error('error:E.encode', 'error');
            console.error(e, 'error');
        }
    };

    // 解密方法
    E.encoder.decode = function (data) {
        if (!data || typeof data !== 'string') {
            return '';
        }

        if (!/^df/.test(data) || !/wf$/.test(data)) {
            try {
                return JSON.parse(data);
            } catch (e) {
                return data;
            }
        }

        var i = '';
        var l = data.length;
        var a = ['%22', '%2C', '%3A', '%5B', '%5D', '%7B', '%7D'];
        var b = data.substr(l - 10, 8).split('');

        try {
            return JSON.parse(window.decodeURIComponent(data.substring(2, l - 10).split('').reverse().join('').replace(new RegExp('\\' + b[7], "g"), '%').replace(new RegExp('\\' + b.join('|\\'), "g"), function (c) {
                for (i in b) {
                    if (b[i] === c) {
                        return a[i];
                    }
                }
            })));
        } catch (e) {
            console.error('error:_wf.decode', 'error');
            console.error(e, 'error');
        }
    };

    E.encoder.str_shuffle = function (str) {
        if (arguments.length === 0) {
            throw 'Wrong parameter count for str_shuffle()';
        }

        if (str === null) {
            return '';
        }

        str += '';

        var newStr = '', rand, i = str.length;

        while (i) {
            rand = Math.floor(Math.random() * i);
            newStr += str.charAt(rand);
            str = str.substring(0, rand) + str.substr(rand + 1);
            i--;
        }

        return newStr;
    };

    // 简单化加减密方法
    E.encode = E.encoder.encode;
    E.decode = E.encoder.decode;

    // 写入本地存储对象
    E.set = function (key, val, prefix) {
        key = E.get_localStorage_key(key, prefix);
        val = E.encode(val);

        window.localStorage.setItem(key, val);
    };

    // 获取本地存储对象
    E.get = function (key, prefix) {
        var val;

        key = E.get_localStorage_key(key, prefix);
        val = window.localStorage.getItem(key);

        val = E.decode(val);

        return val;
    };

    // 删除本地存储对象
    E.del = function (key, prefix) {
        key = E.get_localStorage_key(key, prefix);
        window.localStorage.removeItem(key);
    };

    // 获取本地存储对象的前缀
    E.get_localStorage_key = function (key, prefix) {
        if (!prefix) {
            prefix = E.app.name;
        }

        key = prefix + '_' + key;

        return key;
    };

    // 根据数组的值取数组的键
    E.getArrayKeyByValue = function (array, value) {
        var i;

        for (i in array) {
            if (array[i] === value) {
                return i;
            }
        }

        return null;
    };

    window.E = E;
}(window, document, $);
