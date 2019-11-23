import RealmModel from '../RealmModel';

describe('RealmModel', () => {
    const instance = {} as RealmModel;

    it('type should have "isValid"', () => {
        instance.isValid;
    });

    it('type should have "objectSchema"', () => {
        instance.objectSchema;
    });

    it('type should have "linkingObjects"', () => {
        instance.linkingObjects;
    });

    it('type should have "linkingObjectsCount"', () => {
        instance.linkingObjectsCount;
    });

    it('type should have "addListener"', () => {
        instance.addListener;
    });

    it('type should have "removeListener"', () => {
        instance.removeListener;
    });

    it('type should have "removeAllListeners"', () => {
        instance.removeAllListeners;
    });
});
