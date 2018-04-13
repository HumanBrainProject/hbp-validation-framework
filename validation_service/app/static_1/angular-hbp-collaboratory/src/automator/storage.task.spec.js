/* eslint-plugin eslint-plugin-jasmine */
describe('storage task handler', function() {
  var data;
  var scope;
  var copyEntity;
  var storage;
  var backend;
  var baseUrl;
  var entityUrl;

  beforeEach(module('clb-automator'));
  beforeEach(inject(function(
    $rootScope,
    $httpBackend,
    clbAutomator,
    clbStorage,
    clbEnv
  ) {
    copyEntity = clbAutomator.handlers.storage;
    storage = clbStorage;
    scope = $rootScope;
    backend = $httpBackend;
    baseUrl = function(path) {
      return clbEnv.get('api.document.v1', 'https://services.humanbrainproject.eu/storage/v1/api') + '/' + (path ? path + '/' : '');
    };
    entityUrl = function(path) {
      return baseUrl('entity/' + (path ? path + '/' : ''));
    };
  }));
  beforeEach(function() {
    data = {
      fileEntity: {
        uuid: '123',
        name: 'image.png',
        entity_type: 'file',
        content_type: 'image/png'
      },
      rootEntity: {
        uuid: 'root'
      },
      newEntity: {
        uuid: '421',
        name: 'test.png',
        entity_type: 'file',
        content_type: 'image/png',
        parent: 'root'
      },
      collab: {
        id: 1,
        title: 'My Collab',
        content: 'Description'
      }
    };
  });

  it('should declare a storage handler', function() {
    expect(copyEntity).toBeDefined();
  });

  it('should copy a file to root', inject(function($q) {
    backend.expectGET(entityUrl('?collab_id=1'))
    .respond(200, data.rootEntity);
    spyOn(storage, 'getEntity')
      .and.returnValue($q.when(data.rootEntity));
    spyOn(storage, 'copy').and.returnValue($q.when(data.newEntity));
    var config = {
      collab: data.collab.id,
      entities: {
        'test.png': '123'
      }
    };
    copyEntity(config)
    .then(function(result) {
      expect(result).toEqual({
        'test.png': data.newEntity
      });
    })
    .catch(function(err) {
      expect(err).toBeUndefined();
    });
    scope.$digest();
    expect(storage.getEntity).toHaveBeenCalledWith({collab: data.collab.id});
    expect(storage.copy).toHaveBeenCalledWith(
      data.fileEntity.uuid,
      data.rootEntity.uuid
    );
  }));
});
