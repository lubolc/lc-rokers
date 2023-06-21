const mongoose = require('mongoose');
const offersCtrl = require('../services/offers');
const Offer = mongoose.model('offers');
// const User = mongoose.model('users')
const ConstructionType = mongoose.model('constructionTypes');
const PropertyType = mongoose.model('propertyTypes');
const States = mongoose.model('states');
const Neighborhood = mongoose.model('neighborhoods');
const PhoneNumbers = mongoose.model('phoneNumbers');
const url = require('url');

module.exports = (app) => {
  app.get('/api/delete/:id', (req, res) => {
    const offerId = req.params.id;
    console.log('deleted offer Id ---> ' + offerId);
    const updatedOffer = {
      deletedOn: new Date(),
      isDeleted: true
    };

    Offer.findOneAndUpdate({ _id: offerId }, updatedOffer).then((oldOffer) => {
      console.log('Deleted offer is: ');
      console.log(oldOffer);
      res.send({ deletedOffer: oldOffer });
    });
  });

  app.post('/api/add-details', (req, res) => {
    let data = req.body;
    let promiseArr = [];

    data.constructionType ? promiseArr.push(new ConstructionType({ value: data.constructionType }).save()) : false;

    data.propertyType ? promiseArr.push(new PropertyType({ value: data.propertyType }).save()) : false;

    data.state ? promiseArr.push(new States({ value: data.state }).save()) : false;

    data.neighborhood ? promiseArr.push(new Neighborhood({ value: data.neighborhood }).save()) : false;

    Promise.all(promiseArr)
      .then(function (values) {
        console.log('RESPONSE: ');
        console.log(values);
        res.send(values);
      })
      .catch((error) => {
        res.send({ error });
      });
  });

  app.get('/api/options', (req, res) => {
    let returnObj = {};

    var promise1 = ConstructionType.find({});
    var promise2 = PropertyType.find({});
    var promise3 = States.find({});
    var promise4 = Neighborhood.find({});

    Promise.all([promise1, promise2, promise3, promise4]).then(function (values) {
      returnObj.constructionTypes = values[0];
      returnObj.propertyTypes = values[1];
      returnObj.states = values[2];
      returnObj.neighborhoods = values[3];
      res.send(returnObj);
    });
  });

  app.get('/api/get-offers/:page', (req, res)=> {
        
    const urlParts = url.parse(req.url, true)
    const queryParams = urlParts.query
    const offersPerPage = 10
    const page =  Number(req.params.page)
    const { phoneNumber } = queryParams

    phoneNumber ?        
    offersCtrl.findOffersByPhone(phoneNumber, page, offersPerPage)
    .then((resObj)=>{ res.send(resObj) }).catch((error)=>{ res.send({error}) })
    :
    offersCtrl.getAllOffers(queryParams, page, offersPerPage)
    .then((resObj)=>{ res.send(resObj) }).catch((error)=>{ res.send({error}) })        
})

  // app.get('/api/get-offers/:page', (req, res) => {
  //   console.log('-------------7777777--------------');
  //   console.log(req.url);
  //   // res.send(req.url);
  //   const urlParts = url.parse(req.url, true);
  //   const queryParams = urlParts.query;
  //   const offersPerPage = 10;
  //   const page = Number(req.params.page);
  //   const { phoneNumber } = queryParams;

  //   offersCtrl
  //     .getAllOffers({}, 1, 10)
  //     .then((resObj) => {
  //       res.send(resObj);
  //     })
  //     .catch((error) => {
  //       res.send({ error });
  //     });
  //   // phoneNumber
  //   //   ? offersCtrl
  //   //       .findOffersByPhone(phoneNumber, page, offersPerPage)
  //   //       .then((resObj) => {
  //   //         res.send(resObj);
  //   //       })
  //   //       .catch((error) => {
  //   //         res.send({ error });
  //   //       })
  //   //   : offersCtrl
  //   //       .getAllOffers(queryParams, page, offersPerPage)
  //   //       .then((resObj) => {
  //   //         res.send(resObj);
  //   //       })
  //   //       .catch((error) => {
  //   //         res.send({ error });
  //   //       });
  // });

  app.get('/api/offer/:id', (req, res) => {
    offersCtrl
      .getOffer(req.params.id)
      .then((offer) => {
        res.send(offer);
      })
      .catch((error) => {
        res.send({ error });
      });
  });

  function updatePhones(arrPhones, offerId) {
    let phonesUpdateArr = [];
    function getRes(resolve, reject) {
      arrPhones.forEach((phoneObj) => {
        if (phoneObj.from === '' && phoneObj.to) {
          console.log('CREATE');
          phonesUpdateArr.push(new PhoneNumbers({ offerId, phoneNumber: phoneObj.to }).save());
        } else if (phoneObj.from && phoneObj.to) {
          console.log('UPDATE');
          const newPhoneNumber = { phoneNumber: phoneObj.to };
          phonesUpdateArr.push(PhoneNumbers.findOneAndUpdate({ phoneNumber: phoneObj.from, offerId }, newPhoneNumber));
        } else if (phoneObj.from && phoneObj.to === '') {
          console.log('DELETE');
          PhoneNumbers.remove({ phoneNumber: phoneObj.from, offerId });
        }
      });
      Promise.all(phonesUpdateArr).then((res) => {
        console.log('PROMENENI telefoni');
        console.log(res);
        resolve({ msg: 'Телефоните Бяха Променени', res });
      });
    }
    return new Promise(getRes);
  }

  app.put('/api/offer/:id', (req, res) => {
    console.log('/api/offer: =============');
    console.log('============== UPDATE =================');
    console.log('===============================');

    console.log(req.body);

    const { phoneNumber, phoneNumber2, phoneNumber3 } = req.body;
    let phoneNumbers = [];
    phoneNumbers.push(phoneNumber);
    phoneNumber2 ? phoneNumbers.push(phoneNumber2) : false;
    phoneNumber3 ? phoneNumbers.push(phoneNumber3) : false;

    const {
      area,
      description,
      price,
      address,
      info,
      propertyOwnerName,
      floor,
      constructionTypeId,
      propertyTypeId,
      state,
      neighborhoodId
    } = req.body;

    const lastCall = new Date(req.body.lastCall) === 'Invalid Date' ? new Date() : new Date(req.body.lastCall);
    const nextCall = new Date(req.body.nextCall) === 'Invalid Date' ? new Date() : new Date(req.body.nextCall);

    const updatedOffer = {
      area,
      description,
      phoneNumber,
      phoneNumbers,
      price,
      address,
      info,
      propertyOwnerName,
      floor,
      constructionTypeId,
      propertyTypeId,
      state,
      neighborhoodId,
      lastCall,
      nextCall
    };

    Offer.findOneAndUpdate({ _id: req.params.id }, updatedOffer)
      .then((oldOffer) => {
        console.log('THEN');
        console.log(updatedOffer);

        if (req.body.changedPhones.length > 0) {
          console.log('changedPhones -- REQUEST');
          console.log(req.body.changedPhones);
          updatePhones(req.body.changedPhones, req.params.id).then((phonesRes) => {
            console.log('phonesRes --- >');
            console.log(phonesRes);
            res.send(updatedOffer);
          });
        } else {
          console.log('There is not updated Phones !!!');
          res.send(updatedOffer);
        }
      })
      .catch((error) => {
        res.send({ error });
      });
  });

  app.post('/api/offer', (req, res) => {
    console.log('/api/post-offer');

    offersCtrl
      .addOffer(req.body)
      .then((returnObj) => {
        res.send(returnObj);
      })
      .catch((error) => {
        res.send({ error });
      });
  });

  //// repair phone table
  app.get('/api/add-phones/:id', (req, res) => {
    offersCtrl
      .addPhonesToOffer(req.params.id)
      .then((msg) => {
        res.send(msg);
      })
      .catch((error) => {
        res.send({ error });
      });
  });
  //// repair phone table
};
