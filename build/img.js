var fs = require('fs');
var express = require('express');
var url = require('url');
var app = express();
var mongoose = require('mongoose');

app.use(express.static('./img'));
app.use(express.static('./dist'));
//引入Car表结构
var Car = require('./models/Car.js');
var User = require('./models/User.js');
//连接数据库
mongoose.connect(
    'mongodb://localhost/ershouche',
    { useMongoClient: true }
);

//读取图片地址的接口
app.get('/carpic/:id', function(req, res) {
    var id = req.params.id;

    var engine = fs.readdirSync('./img/carimages/' + id + '/engine');
    var view = fs.readdirSync('./img/carimages/' + id + '/view');
    var more = fs.readdirSync('./img/carimages/' + id + '/more');
    var inner = fs.readdirSync('./img/carimages/' + id + '/inner');

    res.json({
        images: {
            engine: engine,
            view: view,
            more: more,
            inner: inner
        }
    });
});

app.get('/carlike/:id', function(req, res) {
    var id = req.params.id;
    //第一个事情，知道这辆车是什么品牌和车系，要读取数据库
    Car.find({ id: id }).exec(function(err, data) {
        const brand = data[0].brand;
        const series = data[0].series;

        Car.find({ brand, series, id: { $not: { $eq: id } } }).exec(function(err, data) {
            res.json({ result: data });
        });
    });
});

app.get('/cars/:id', function(req, res) {
    var id = req.params.id;
    Car.find({ id }).exec(function(err, data) {
        res.json({ info: data[0] }); //因为data是数组，这个id的车只有一辆
    });
});

app.get('/cars', function(req, res) {
    const obj = url.parse(req.url, true).query;
    const page = obj.page;
    const pagesize = obj.pagesize;
    const sortby = obj.sortby;
    const sortdirection = obj.sortdirection;

    const dbObj = {};

    if (obj.color) {
        dbObj.color = JSON.parse(obj.color);
    }

    if (obj.color) {
        dbObj.color = JSON.parse(obj.color);
    }

    if (obj.environmental) {
        dbObj.environmental = JSON.parse(obj.environmental);
    }

    if (obj.displacement) {
        dbObj.displacement = JSON.parse(obj.displacement);
    }

    if (obj.type) {
        dbObj.type = JSON.parse(obj.type);
    }
    if (obj.gearbox) {
        dbObj.gearbox = JSON.parse(obj.gearbox);
    }
    if (obj.brand) {
        dbObj.brand = JSON.parse(obj.brand);
    }
    if (obj.fuel) {
        dbObj.fuel = JSON.parse(obj.fuel);
    }

    if (obj.price) {
        var priceArr = JSON.parse(obj.price);
        dbObj.price = { $gte: priceArr[0], $lte: priceArr[1] };
    }

    if (obj.km) {
        var kmArr = JSON.parse(obj.km);
        dbObj.km = { $gte: kmArr[0], $lte: kmArr[1] };
    }

    //skip()  跳转指定数量的数据，接受一个数字参数作为跳过的记录条数
    //limit(2) 读取指定数量
    //sort()   排序
    //skip和limit方法顺序每页要求，不管怎么防止，执行顺序都是先sort 后skip 最后limit

    Car.find(dbObj)
        .sort({ [sortby]: sortdirection })
        .skip(pagesize * (page - 1))
        .limit(pagesize)
        .exec(function(err, data) {
            res.json({
                count: data.length,
                results: data
            });
        });
});

app.get('/users', function(req, res) {
    const obj = url.parse(req.url, true).query;
    const page = obj.page;
    const pagesize = obj.pagesize;
    const sortby = obj.sortby;
    const sortdirection = obj.sortdirection;
    const keyword = obj.keyword;
    const keywordArr = keyword.split(',');

    let dbobj = null;

    if (keywordArr.length > 1) {
        dbobj = {
            name: keywordArr.map(item => new RegExp(item, 'g')),
            tel: keywordArr.map(item => new RegExp(item, 'g'))
        };
    } else {
        dbobj = {
            $or: [
                { name: keywordArr.map(item => new RegExp(item, 'g')) },
                { tel: keywordArr.map(item => new RegExp(item, 'g')) }
            ]
        };
    }

    User.find(dbobj)
        .sort({ [sortby]: sortdirection })
        .skip(pagesize * (page - 1))
        .limit(pagesize)
        .exec(function(err, data) {
            res.json({
                count:data.length,
                results: data
            });
        });
});

app.listen(3000);
