/* eslint camelcase:0 */

describe('clbStorage', function() {
  var $rootScope;
  var $q;
  var backend;
  var service;
  var clbUser;
  var contextId;
  var actual;
  var assign = function(val) {
    actual = val;
  };
  var entityUrl;
  var baseUrl;
  var fileUrl;
  var projectUrl;
  var entity;
  var addSlashDecorator;

  beforeEach(module('clb-storage'));

  beforeEach(inject(function(_$q_,
                                $httpBackend,
                                _$rootScope_,
                                clbStorage,
                                clbEnv,
                                _clbUser_) {
    $rootScope = _$rootScope_;
    $q = _$q_;
    backend = $httpBackend;
    service = clbStorage;
    clbUser = _clbUser_;

    baseUrl = function(path) {
      return clbEnv.get('api.document.v1') + '/' + (path ? path : '');
    };

    addSlashDecorator = function(path) {
      var lastSlashIndex = path.lastIndexOf('/');

      if (path.indexOf('?') > -1) {
        return path;
      } else if (lastSlashIndex < path.length - 1) {
        return path + '/';
      }
      return path;
    };

    entityUrl = function(path) {
      return addSlashDecorator(baseUrl('entity/' + (path ? path : '')));
    };

    fileUrl = function(path) {
      return addSlashDecorator(baseUrl('file/' + (path ? path : '')));
    };

    projectUrl = function(path) {
      return addSlashDecorator(baseUrl('project/' + (path ? path : '')));
    };

    contextId = '30FF9E92-B994-41D2-B6F9-9D03BC8C70AD';
    entity = {
      uuid: '106884F1-9EA1-4542-AF73-E28F27629400',
      entity_type: 'file'
    };
  }));

    // Prevent request mismatch
  afterEach(function() {
    backend.verifyNoOutstandingExpectation();
    backend.verifyNoOutstandingRequest();
    actual = null;
  });

  describe('isContainer', function() {
    it('should consider folder as a container', function() {
      expect(service.isContainer({entity_type: 'folder'})).toBe(true);
    });
    it('should consider project as a container', function() {
      expect(service.isContainer({entity_type: 'project'})).toBe(true);
    });
    it('should consider folder link as a container', function() {
      expect(service.isContainer({entity_type: 'link:folder'})).toBe(true);
    });
    it('should not consider file as a container', function() {
      expect(service.isContainer({entity_type: 'file'})).toBe(false);
    });
    it('should not consider file link as a container', function() {
      expect(service.isContainer({entity_type: 'link:file'})).toBe(false);
    });
  });

  describe('getEntity', function() {
    describe('by UUID', function() {
      it('accept a string', function() {
        backend.expectGET(entityUrl(entity.uuid))
                    .respond(200, entity);
        service.getEntity(entity.uuid).then(assign);
        backend.flush(1);
        expect(actual).toDeepEqual(entity);
      });
      it('accept an HPC entity id as string', function() {
        entity.uuid = 'HPC/JUQUEEN';
        backend.expectGET(entityUrl(entity.uuid))
                    .respond(200, entity);
        service.getEntity(entity.uuid).then(assign);
        backend.flush(1);
        expect(actual).toDeepEqual(entity);
      });
      it('does not accept random strings as ids', function() {
        entity.uuid = 'HPAC/JUQUEEN';
        service.getEntity(entity.uuid).then(assign).catch(assign);
        $rootScope.$apply();
        expect(actual).toBeHbpError();
      });
      it('accept an entity descriptor', function() {
        backend.expectGET(entityUrl(entity.uuid))
                    .respond(200, entity);
        service.getEntity(entity).then(assign);
        backend.flush(1);
        expect(actual).toDeepEqual(entity);
      });
      it('accept an HPC entity descriptor', function() {
        entity.uuid = 'HPC/JUQUEEN';
        backend.expectGET(entityUrl(entity.uuid))
                    .respond(200, entity);
        service.getEntity(entity).then(assign);
        backend.flush(1);
        expect(actual).toDeepEqual(entity);
      });
      it('does not accept a non HPC entity descriptor', function() {
        entity.uuid = 'HPAC/JUQUEEN';
        service.getEntity(entity.uuid).then(assign).catch(assign);
        $rootScope.$apply();
        expect(actual).toBeHbpError();
      });
      it('forward any exception', function() {
        backend.expectGET(entityUrl(entity.uuid))
                    .respond(500);
        service.getEntity(entity.uuid).then(assign).catch(assign);
        backend.flush(1);
        expect(actual).toBeHbpError();
      });
    });

    describe('by Collab Context', function() {
      it('accept a UUID set as locator.ctx', function() {
        var results = {results: [{}]};
        backend.expectGET(
                    entityUrl('?ctx_30FF9E92-B994-41D2-B6F9-9D03BC8C70AD=1'))
                    .respond(200, results);
        service.getEntity({
          ctx: contextId
        }).then(assign);
        backend.flush();
        expect(actual).toDeepEqual(results);
      });
      it('forward any exception', function() {
        backend.expectGET(
                    entityUrl('?ctx_30FF9E92-B994-41D2-B6F9-9D03BC8C70AD=1')
                ).respond(500);
        service.getEntity({ctx: contextId}).then(assign).catch(assign);
        backend.flush(1);
        expect(actual).toBeHbpError();
      });
    });

    describe('using a collab ID', function() {
      it('accept an ID set as locator.collab', function() {
        // given
        var expectedResult = entity;
        backend
          .when('GET', baseUrl('project/?collab_id=1'))
          .respond(200, {count: 1, results: [expectedResult]});

        // when
        service.getEntity({collab: 1}).then(assign).catch(assign);
        backend.flush();

        // then
        expect(actual).toDeepEqual(entity);
      });

      it('should forward any server exception', function() {
        backend.expectGET(projectUrl('?collab_id=1'))
                    .respond(500);
        service.getEntity({collab: 1}).then(assign).catch(assign);
        backend.flush();
        expect(actual).toBeHbpError();
      });
    });
  });

  describe('getAbsolutePath', function() {
    it('should generate the entity absolute path', function() {
      backend.expectGET(baseUrl('entity/' + entity.uuid + '/path/'))
                .respond(200, {
                  uuid: entity.uuid,
                  path: '/A/B/C.txt'
                });
      service.getAbsolutePath(entity).then(assign);
      backend.flush();
      expect(actual).toBe('/A/B/C.txt');
    });
  });

  describe('getProjects', testGetProjectsList('getProjects'));

  describe('getChildren', function() {
    describe('root projects', function() {
      var projectEntity;
      beforeEach(function() {
        projectEntity = {
          uuid: '331C0A79-A12F-46AF-9DE4-09C43C0D8FFB',
          entity_type: 'project',
          created_by: '111',
          modified_by: '222'
        };
      });
      it('accept a null parent', function() {
        backend.expectGET(baseUrl('project/?ordering=name'))
                    .respond({
                      results: [projectEntity],
                      hasMore: false
                    });
        service.getChildren().then(assign);
        backend.flush();
        expect(actual).toBeAPaginatedResultSet();
        expect(actual.results).toDeepEqual([projectEntity]);
      });

      it('resolves user ids, if requested', function() {
        var projectEntityBis = {
          uuid: '104facf9-f81f-4518-968c-6a69e434747a',
          entity_type: 'project',
          created_by: '333',
          modified_by: '444'
        };

        var ben = {id: '111', displayName: 'Ben'};
        var and = {id: '222', displayName: 'And'};
        var jerry = {id: '333', displayName: 'Jerry'};
        // 444 is not found
        spyOn(clbUser, 'get').and.returnValue($q.when({
          111: ben,
          222: and,
          333: jerry
        }));

        backend.expectGET(baseUrl('project/?ordering=name'))
                    .respond({
                      results: [projectEntity, projectEntityBis],
                      hasMore: false
                    });
        service.getChildren(null, {
          resolveUserId: true
        }).then(assign);
        backend.flush(1);
        expect(actual.hasNext).toBe(false);
        expect(clbUser.get).toHaveBeenCalledWith(['111', '222', '333', '444']);
        // test user resolution
        expect(actual.results[0].created_by_user.displayName).toEqual('Ben');
        expect(actual.results[0].modified_by_user.displayName).toEqual('And');
        expect(actual.results[1].created_by_user.displayName).toEqual('Jerry');
        expect(actual.results[1].modified_by_user).toBeUndefined();
      });

      it('does not fail if modified_by or created_by is not provided', function() {
        var projectEntityBis = {
          uuid: '104facf9-f81f-4518-968c-6a69e434747a',
          entity_type: 'project',
          created_by: '111'
        };
        var projectEntityTer = {
          uuid: '104facf9-f81f-4518-968c-6a69e434747a',
          entity_type: 'project'
        };
        var ben = {id: '111', displayName: 'Ben'};
        spyOn(clbUser, 'get').and.returnValue($q.when({
          111: ben
        }));

        backend.expectGET(baseUrl('project/?ordering=name'))
                    .respond({
                      results: [projectEntityBis, projectEntityTer],
                      hasMore: false
                    });
        service.getChildren(null, {
          resolveUserId: true
        }).then(assign);
        backend.flush(1);
        expect(actual.hasNext).toBe(false);
        expect(clbUser.get).toHaveBeenCalledWith(['111']);
        // test user resolution
        expect(actual.results[0].created_by_user.displayName).toEqual('Ben');
        expect(actual.results[0].modified_by_user).toBeUndefined();
        expect(actual.results[1].created_by_user).toBeUndefined();
        expect(actual.results[1].modified_by_user).toBeUndefined();
      });

      describe('lists projects', testGetProjectsList('getChildren'));

      it('lists HPC projects', function() {
        var hpcProjectEntity = {
          uuid: 'HBP/JUQUEEN',
          name: 'HBP-JUQUEEN',
          entity_type: 'project'
        };
        backend.expectGET(baseUrl('project/?hpc=true'))
                    .respond({
                      results: [hpcProjectEntity],
                      hasMore: false
                    });
        service.getProjects({hpc: true}).then(assign);
        backend.flush(1);
        expect(actual.hasNext).toBe(false);
        expect(actual.results).toEqual([hpcProjectEntity]);
      });
    });

    describe('from a folder', function() {
      it('accept a parent entity', function() {
        var folder = {
          uuid: 'ED0FFE22-4C02-4631-B05E-683D6E70784A',
          entity_type: 'folder'
        };

        backend.expectGET(baseUrl('folder/' + folder.uuid +
                    '/children/?ordering=name')
                ).respond({});
        service.getChildren(folder).then(assign);
        backend.flush();
        expect(actual).toBeAPaginatedResultSet();
      });
    });
  });

  function testGetProjectsList(funcName) {
    return function() {
      var projectEntity;
      var projectEntityBis;
      beforeEach(function() {
        projectEntity = {
          uuid: '331C0A79-A12F-46AF-9DE4-09C43C0D8FFB',
          entity_type: 'project'
        };
        projectEntityBis = {
          uuid: '104facf9-f81f-4518-968c-6a69e434747a',
          entity_type: 'project'
        };
      });
      it('retrieve results', function() {
        backend.expectGET(baseUrl('project/?ordering=name'))
                    .respond({
                      results: [projectEntity],
                      hasMore: false
                    });
        service[funcName]().then(assign);
        backend.flush(1);
        expect(actual.hasNext).toBe(false);
        expect(actual.results).toEqual([projectEntity]);
      });
      it('support pagination', function() {
        backend.expectGET(baseUrl('project/?ordering=name'))
                    .respond({
                      results: [projectEntity],
                      next: baseUrl('project/?page=1&page_size=1&ordering=name')
                    });
        service[funcName]().then(assign);
        backend.flush(1);
        expect(actual.hasNext).toBe(true);
        expect(actual.results).toEqual([projectEntity]);

        backend.expectGET(baseUrl('project/?page=1&page_size=1&ordering=name'))
                    .respond({
                      results: [projectEntityBis],
                      previous: baseUrl('project/?page=0&page_size=1&ordering=name')
                    });
        actual.next();
        backend.flush(1);
        expect(actual.hasNext).toBe(false);
        expect(actual.results).toEqual([projectEntity, projectEntityBis]);
      });
      it('support backward pagination', function() {
        backend.expectGET(baseUrl('project/?ordering=name'))
                    .respond({
                      results: [projectEntityBis],
                      previous: baseUrl('project/?page=0&page_size=1&ordering=name')
                    });
        service[funcName]().then(assign);
        backend.flush(1);
        expect(actual.hasPrevious).toBe(true);
        expect(actual.results).toEqual([projectEntityBis]);

        backend.expectGET(baseUrl('project/?page=0&page_size=1&ordering=name'))
                    .respond({
                      results: [projectEntity],
                      next: baseUrl('project/?page=1&page_size=1&ordering=name')
                    });
        actual.previous();
        backend.flush(1);
        expect(actual.hasPrevious).toBe(false);
        expect(actual.results).toEqual([projectEntity, projectEntityBis]);
      });
    };
  }

  describe('metadata', function() {
    describe('setContextMetadata(entity, contextId)', function() {
      it('should let you define a metadata', function() {
        backend.expectPOST(
                    baseUrl('file/' + entity.uuid + '/metadata/'), {
                      'ctx_30FF9E92-B994-41D2-B6F9-9D03BC8C70AD': 1
                    }
                ).respond(201);
        service.setContextMetadata(entity, contextId);
        backend.flush();
      });
      it('return a promise', function() {
        backend.expectPOST(
                    baseUrl('file/' + entity.uuid + '/metadata/'), {
                      'ctx_30FF9E92-B994-41D2-B6F9-9D03BC8C70AD': 1
                    }
                ).respond(201);
        expect(service.setContextMetadata(entity, contextId)).toBeAPromise();
        backend.flush();
      });
    });
    describe('deleteContextMetadata(entity, contextId)', function() {
      it('should delete the entity metadata key', function() {
        backend.expectDELETE(
                    baseUrl('file/106884F1-9EA1-4542-AF73-E28F27629400/metadata/')
                ).respond(200);
        service.deleteContextMetadata(entity, contextId);
        backend.flush();
      });
    });
    describe('updateContextMetadata(newEty, oldEty, contextId)', function() {
      it('should update the context metadata', function() {
        backend.expectDELETE(
                    baseUrl('file/106884F1-9EA1-4542-AF73-E28F27629400/metadata/')
                ).respond(200);
        var newEntity = {
          uuid: 'new',
          entity_type: 'file'
        };
        service.updateContextMetadata(newEntity, entity, contextId);

        backend.expectPOST(
                    baseUrl('file/new/metadata/'), {
                      'ctx_30FF9E92-B994-41D2-B6F9-9D03BC8C70AD': 1
                    }
                ).respond(201);
        backend.flush(1);
        var expectedMetadata = {};
        expectedMetadata['ctx_' + contextId] = 1;
        backend.flush(1);
      });
    });
    it('returns entity metadata', function() {
      var metadata = {_contentUri: '/a/b/c'};
      backend.expectGET(
                  baseUrl('file/106884F1-9EA1-4542-AF73-E28F27629400/metadata/')
              ).respond(200, metadata);
      var result;
      service.getMetadata(entity).then(function(meta) {
        result = meta;
      });
      backend.flush(1);
      expect(result).toEqual(metadata);
    });
  });

  describe('File Upload', function() {
    var standardHeader;
    var parentEntity;
    var fileEntity;
    var newEntityPost;
    var newEntity;

    beforeEach(function() {
      standardHeader = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=utf-8'
      };
      parentEntity = {
        uuid: '2E89ED66-0528-4779-BD59-B95239E22821',
        entity_type: 'folder'
      };
      fileEntity = {
        uuid: '24DB8DF8-18D8-4A48-8895-FA4BDEFB3AC9',
        name: 'test.png',
        parent: '07BC1AAE-BE2C-4D4C-8214-7B52928AE4EE',
        description: 'desc',
        content_type: 'image/png',
        entity_type: 'file'
      };
      newEntityPost = {
        name: 'test.png',
        parent: '2E89ED66-0528-4779-BD59-B95239E22821',
        description: 'desc',
        content_type: 'image/png'
      };
      newEntity = angular.extend({}, newEntityPost, {
        uuid: 'B21BA1CC-502F-4310-98B3-6DECBB2082F8',
        entity_type: 'file'
      });
    });

    afterEach(function() {
      backend.verifyNoOutstandingExpectation();
      backend.verifyNoOutstandingRequest();
    });

    describe('copy', function() {
      it('should copy a file entity', function() {
        backend.expectGET(entityUrl(fileEntity.uuid))
                    .respond(200, fileEntity);
        backend.expectPOST(baseUrl('file/'), newEntityPost)
                    .respond(201, newEntity);
        backend.expectPUT(fileUrl(newEntity.uuid + '/content/'),
                    {},
                    angular.extend({'X-Copy-From': fileEntity.uuid}, standardHeader)
                ).respond(200);
        service.copy(fileEntity.uuid, parentEntity.uuid)
                    .then(function(entity) {
                      expect(entity).toEqual(newEntity);
                    }).catch(function(err) {
                      expect(err).toBeUndefined();
                    });
        backend.flush(3);
      });

      it('should fail with a terrible error', function() {
        backend.expectGET(entityUrl(fileEntity.uuid))
                    .respond(200, fileEntity);
        backend.expectPOST(baseUrl('file/'))
                    .respond(201, newEntity);
        backend.expectPUT(fileUrl(newEntity.uuid + '/content/'))
                    .respond(500);
        service.copy(fileEntity.uuid, parentEntity.uuid)
                    .then(function(entity) {
                      expect(entity).toBeUndefined();
                    }).catch(function(err) {
                      expect(err.code).toBe(500);
                    });
        backend.flush(3);
      });
    });

    describe('getCollabHome', function() {
      it('should reject with an error in case of a http error', function() {
        var error;

        // given
        backend
          .when('GET', baseUrl('project/?collab_id=42'))
          .respond(404);

        // when
        service.getCollabHome(42)
          .catch(function(e) {
            error = e;
          });
        backend.flush();

        // then
        expect(error.type).toEqual('NotFound');
      });

      it('should throw an error if no id is provided', function() {
        // when
        expect(service.getCollabHome)

        // then
        .toThrowError('Missing mandatory `collabId` parameter');
      });

      it('should reject with an error if no project is returned', function() {
        var error;

        // given
        backend
          .when('GET', baseUrl('project/?collab_id=42'))
          .respond(200, {count: 0});

        // when
        service.getCollabHome(42)
          .catch(function(e) {
            error = e;
          });
        backend.flush();

        // then
        expect(error.type).toEqual('NotFound');
      });

      it('should return the first project', function() {
        var A_PROJECT = {name: 'my project'};
        var project;

        // given
        backend
          .when('GET', baseUrl('project/?collab_id=42'))
          .respond(200, {count: 1, results: [A_PROJECT]});

        // when
        service.getCollabHome(42)
          .then(function(p) {
            project = p;
          });
        backend.flush();

        // then
        expect(project).toEqual(A_PROJECT);
      });
    });

    describe('update', function() {
      it('should reject with an error in case of a http error', function() {
        var error;

        // given
        backend
          .when('PATCH', baseUrl('project/123/'))
          .respond(404);

        // when
        service.update({
          uuid: '123',
          entity_type: 'project'
        }).catch(function(e) {
          error = e;
        });
        backend.flush();

        // then
        expect(error.type).toEqual('NotFound');
      });

      it('should throw an error if no entity is provided', function() {
        // when
        expect(service.update)
        // then
        .toThrowError('Missing mandatory `entity` parameter');
      });

      it('should throw an error if no entity uuid is provided', function() {
        // when
        expect(function() {
          service.update({entity_type: 'project'});
        })
        // then
        .toThrowError('Missing mandatory `entity.uuid` parameter');
      });

      it('should throw an error if no entity type is provided', function() {
        // when
        expect(function() {
          service.update({uuid: '123'});
        })
        // then
        .toThrowError('Missing mandatory `entity.entity_type` parameter');
      });

      it('should return the updated entity', function() {
        var entity = {
          uuid: '12345',
          entity_type: 'folder',
          name: 'my folder'
        };
        var result;

        backend.expectPATCH(baseUrl('folder/12345/'))
                    .respond(200, entity);

        // when
        service.update(entity)
          .then(function(e) {
            result = e;
          });
        backend.flush(1);

        // then
        expect(result).toEqual(entity);
      });
    });

    describe('delete', function() {
      it('should reject with an error in case of a http error', function() {
        var error;

        // given
        backend
          .when('DELETE', baseUrl('file/123/'))
          .respond(403);

        // when
        service.delete({
          uuid: '123',
          entity_type: 'file'
        }).catch(function(e) {
          error = e;
        });
        backend.flush();

        // then
        expect(error.type).toEqual('Forbidden');
      });

      it('should throw an error if no entity is provided', function() {
        // when
        expect(service.delete)
        // then
        .toThrowError('Missing mandatory `entity` parameter');
      });

      it('should throw an error if no entity uuid is provided', function() {
        // when
        expect(function() {
          service.delete({entity_type: 'file'});
        })
        // then
        .toThrowError('Missing mandatory `entity.uuid` parameter');
      });

      it('should throw an error if no entity type is provided', function() {
        // when
        expect(function() {
          service.delete({uuid: '123'});
        })
        // then
        .toThrowError('Missing mandatory `entity.entity_type` parameter');
      });

      it('should resolve successfully', function() {
        var entity = {
          uuid: '12345',
          entity_type: 'folder',
          name: 'my folder'
        };
        var status;

        backend.expectDELETE(baseUrl('folder/12345/'))
                    .respond(204);

        // when
        service.delete(entity)
          .then(function(e) {
            status = e.status;
          });
        backend.flush(1);

        // then
        expect(status).toEqual(204);
      });
    });

    describe('getContent', function() {
      var content = 'abcd';
      var entity = {
        uuid: '12345',
        entity_type: 'folder',
        name: 'my folder'
      };

      it('should accept a uuid', function() {
        var result;
        backend.expectGET(baseUrl('file/12345/content/'))
                    .respond(200, content);
        // when
        service.getContent(entity.uuid)
          .then(function(data) {
            result = data;
          });
        backend.flush(1);

        // then
        expect(result).toEqual(content);
      });

      it('should accept an entity', function() {
        var result;
        backend.expectGET(baseUrl('file/12345/content/'))
                    .respond(200, content);
        // when
        service.getContent(entity)
          .then(function(data) {
            result = data;
          });
        backend.flush(1);

        // then
        expect(result).toEqual(content);
      });

      it('should complain if you provide something else', function() {
        // when
        expect(function() {
          service.getContent({some_id: '123'});
        })
        // then
        .toThrowError('`entity` parameter is not valid');
      });
    });
  });
});
