import analytics from '@react-native-firebase/analytics';


export default class MyAnalytic {

    /**
     * 
     * @param {String} key 
     * @param {Object} obj 
     */
    async logEvent(key, obj) {
        await analytics().logEvent(key, obj)
    }


    ///////////////////////////  -- TEST  --  ////////////////////////////
    async addTest() {
        //100 characters is the maximum length for param key names.
        await analytics().logEvent('basket', {
            id: 3745092,
            item: 'mens grey t-shirt',
            description: ['round neck', 'long sleeved'],
            size: 'L',
        })
    }
    async add_TEST_LOG() {
        await analytics().logSelectContent({
            content_type: 'clothing',
            item_id: 'abcd',
        })
    }
    async addLog(obj) {
        await analytics().logSelectContent(obj)
    }
    ///////////////////////////  -- TEST  --  ////////////////////////////
}



