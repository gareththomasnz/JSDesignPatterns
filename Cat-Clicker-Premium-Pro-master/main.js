$(function(){

  var model = {
    currentCat: null,
    admin: false,
    cats:[
      {
      imgUrl: 'https://booming-games.com/img/slots-page/slots-gallery/Bedtime_Stories.png',
      numCliks: 0,
      catName: 'Freddy'
    },{
      imgUrl: 'https://booming-games.com/img/slots-page/slots-gallery/Cosmic_Fruit.png',
      numCliks: 0,
      catName: 'Bart'
    },{
      imgUrl: 'https://booming-games.com/img/slots-page/slots-gallery/DeepSea_Danger.png',
      numCliks: 0,
      catName: 'Joe'
    },{
      imgUrl: 'https://booming-games.com/img/slots-page/slots-gallery/Devils_Lust.png',
      numCliks: 0,
      catName: 'Duncan'
    },{
      imgUrl: 'https://booming-games.com/img/slots-page/slots-gallery/Dolphins_Luck.png',
      numCliks: 0,
      catName: 'Tyresse'
    }]
  };

var catView = {
  init: function () {
      //Store pointers to DOM
      this.catWrapper = $('.catWrapper');
      this.catName = $('.catWrapper').find('h2');
      this.catImg = $('.catWrapper').find('img');
      this.catCount = $('.catWrapper').find('h3');
      //on click increment current cats counter
      this.catImg.on('click',function () {
        octopus.incrementCounter();
      });
      this.render();
  },
  render: function () {
    // Udate elemets with values from Current cat
    this.currentcat = octopus.getCurrentCat();
    this.catCount.html(this.currentcat.numCliks);
    this.catName.html(this.currentcat.catName);
    this.catImg.attr('src',this.currentcat.imgUrl);
  }
};


var catListView = {
  init: function () {
    this.catListElem = $('.catList');
    this.render();
  },
  render: function () {
    var cats = octopus.getCats(),
        cat,
        elem,
        i,
        catsLength = cats.length;
    // empty cats list
    this.catListElem.html('');

    for (i = 0; i < catsLength; i++) {
      cat = cats[i];
      elem = $('<li></li>');
      elem.text(cat.catName);

      //on click set currentCat and re-render with closure trick
      elem.on('click',(function (catCopy) {
        return function () {
          octopus.setCurrentCat(catCopy);
          catView.render();
        };
      })(cat));
      //finally add elems

      this.catListElem.append(elem);
    }
  }

};

//add the event listeners.. so when we click save we run aour function
var adminView = {
  init: function () {
    //cache dom elements and set events
    this.toggle = $('.toggle');
    this.admin = $('.admin');
    this.catName = $("[name='name']");
    this.imgUrl = $("[name='url']");
    this.numCliks = $("[name='clicks']");
    this.input = $('.in');
    this.render();
  },
  render: function () {
    this.input.on('click',function (e) {
      e.preventDefault();
      octopus.updateFromForm();
    });

    this.toggle.on('click',function () {
      octopus.toogleAdmin();
    });
  }
};


var octopus = {
  init: function () {
    model.currentCat = model.cats[0];
    catListView.init();
    catView.init();
    adminView.init();
  },
  getCurrentCat: function () {
    return model.currentCat;
  },
  getCats: function () {
    return model.cats;
  },
  setCurrentCat: function (cat) {
    model.currentCat = cat;
  },
  incrementCounter: function () {
    model.currentCat.numCliks++;
    catView.render();
  },
  updateFromForm: function () {
    model.currentCat.catName  = adminView.catName.val();
    model.currentCat.numCliks = adminView.numCliks.val();
    model.currentCat.imgUrl = adminView.imgUrl.val();
    catListView.render()
    catView.render();
  },
  toogleAdmin: function () {
    if (model.admin === false) {
      adminView.admin.show();
      model.admin = true;
    }else{
    adminView.admin.hide();
      model.admin = false;
    }
  },
};


octopus.init();


});
