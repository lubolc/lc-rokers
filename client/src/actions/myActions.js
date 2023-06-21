import axios from 'axios';
import types from './types';
import toastr from 'toastr';
import history from '../history';

export default {
  //// repair phone table
  savePhones: (offerId) => {
    axios.get('/api/add-phones/' + offerId).then((res) => {
      toastr.success(res.data.msg);
    });
  },
  addDetailsPost: (params) => {
    let options = {
      method: 'post',
      url: '/api/add-details',
      data: params
    };

    return (dispatch) => {
      axios(options).then((res) => {
        console.log('/api/add-details server res: ', res);
        if (res.data.error) {
          toastr.error('Има проблем на сървъра !');
          return;
        }

        return dispatch({
          type: types.ADD_DETAILS,
          payload: res.data
        });
      });
    };
  },

  getDetails: (params) => {
    return (dispatch) => {
      axios.get('/api/options', params).then((res) => {
        return dispatch({
          type: types.GET_OFFER_OPTIONS,
          payload: res.data
        });
      });
    };
  },
  chnageSelectDetailsOffer: (params) => {
    return (dispatch) => {
      return dispatch({
        type: types.CHANGE_OFFER_OPTIONS,
        payload: params
      });
    };
  },
  chnageSelectDetailsOptions: (params) => {
    return (dispatch) => {
      return dispatch({
        type: types.CHANGE_DETAILS_OPTIONS,
        payload: params
      });
    };
  },
  postOfferForm: (params) => {
    return (dispatch) => {
      params.addedOn = new Date();
      let options = {
        method: 'post',
        url: '/api/offer',
        data: params
      };

      axios(options)
        .then((res) => {
          console.log('/api/post-offer server res: ');
          console.log(res.data);

          if (res.data.error) {
            toastr.error(res.data.error.message);
            console.log(res.data.error);
            toastr.error(res.data.error.name);
            toastr.error('Офертата не беше добавена !');
          } else {
            toastr.success('Офертата беше добавена');
          }

          return dispatch({
            type: types.POST_OFFER_FORM,
            payload: 'success'
          });
        })
        .catch(function (error) {
          toastr.error('Възникна проблем със сървъра');
          console.log(error);
        });
    };
  },
  getOffers: (page, queryStr) => {
    // console.log('get offers ',page, queryStr)

    if (queryStr) {
      queryStr = queryStr.indexOf('?') === -1 ? '?' + queryStr : queryStr;
    } else {
      queryStr = '';
    }

    return (dispatch) => {
      axios.get(`http://localhost:5000/api/get-offers/${page}${queryStr}`).then((res) => {
        // console.log('/api/get-offers', res)
        return dispatch({
          type: types.GET_OFFERS,
          payload: res.data
        });
      });
    };
  },
  updateOffer: (params) => {
    console.log('request params');
    console.log(params);
    let options = {
      method: 'put',
      url: '/api/offer/' + params._id,
      data: params
    };

    return (dispatch) => {
      axios(options).then((res) => {
        console.log(res);
        if (res.data.error) {
          toastr.error('Възникна проблем на сървъра !');
          toastr.error('Офертата не беше променеа !');
          return;
        }
        toastr.success('Офертата беше променена');
        return dispatch({
          type: types.GET_OFFER,
          payload: res.data
        });
      });
    };
  },
  getOffer: (id) => {
    return (dispatch) => {
      axios.get('/api/offer/' + id).then((res) => {
        return dispatch({
          type: types.GET_OFFER,
          payload: res.data
        });
      });
    };
  },
  deleteOffer: (id) => {
    return (dispatch) => {
      axios.get('/api/delete/' + id).then((res) => {
        toastr.error('Офертата беше изтрита ');
        console.log('server responce');
        console.log(res.data);
        history.goBack();
        return;
      });
    };
  }
};
