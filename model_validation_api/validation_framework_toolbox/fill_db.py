# from model_validation_api.models import (ValidationTestDefinition, 
#                         ValidationTestCode,
#                         ValidationTestResult, 
#                         ScientificModel, 
#                         ScientificModelInstance,
#                         ScientificModelImage,   
#                         Comments,
#                         Tickets,
#                         # FollowModel,
#                         CollabParameters,
#                         Param_DataModalities,
#                         Param_TestType,
#                         Param_Species,
#                         Param_BrainRegion,
#                         Param_CellType,
#                         Param_ModelType,
#                         Param_ScoreType,
#                         Param_organizations,
#                         )
from uuid import uuid4
import uuid
import datetime
import time




def create_fake_collab(
                        id="1", 
                        collab_id="1",
                        data_modality='electrophysiology', 
                        test_type='subcellular', 
                        species='Other', 
                        brain_region='Hippocampus',
                        cell_type = 'Interneuron',
                        model_type = 'Single Cell',
                        organization= '',
                        app_type = '',
                        ):
    collab1 = CollabParameters(id=id, collab_id=collab_id)
    collab1.save()
    # collab1.data_modalities.add( Param_DataModalities.objects.get(authorized_value=data_modality) )
    # collab1.test_type.add( Param_TestType.objects.get(authorized_value=test_type))
    # collab1.species.add(Param_Species.objects.get(authorized_value=species) )
    # collab1.brain_region.add(Param_BrainRegion.objects.get(authorized_value=brain_region)  )
    # collab1.cell_type.add(Param_CellType.objects.get(authorized_value=cell_type))
    # collab1.model_type.add(Param_ModelType.objects.get(authorized_value=model_type) )

    collab1.data_modalities = data_modality 
    collab1.test_type =test_type
    collab1.species =species
    collab1.brain_region = brain_region 
    collab1.cell_type =cell_type
    collab1.model_type = model_type 
    collab1.organization = organization 
    collab1.app_type = app_type 

    collab1.save()
    return (collab1)

def create_all_parameters ():
    create_data_modalities()
    create_organizations()
    create_test_types()
    create_score_type()
    create_species()
    create_brain_region()
    create_cell_type()
    create_model_type()

def create_data_modalities():
    Param_DataModalities(id=uuid.uuid4(),authorized_value='electrophysiology').save()
    Param_DataModalities(id=uuid.uuid4(),authorized_value='fMRI').save()
    Param_DataModalities(id=uuid.uuid4(),authorized_value='2-photon imaging').save()
    Param_DataModalities(id=uuid.uuid4(),authorized_value='electron microscopy').save()
    Param_DataModalities(id=uuid.uuid4(),authorized_value='histology').save()   

def create_organizations():
    Param_organizations(id=uuid.uuid4(),authorized_value='HBP-SP1').save()
    Param_organizations(id=uuid.uuid4(),authorized_value='HBP-SP2').save()
    Param_organizations(id=uuid.uuid4(),authorized_value='HBP-SP3').save()            
    Param_organizations(id=uuid.uuid4(),authorized_value='HBP-SP4').save()
    Param_organizations(id=uuid.uuid4(),authorized_value='HBP-SP5').save()
    Param_organizations(id=uuid.uuid4(),authorized_value='HBP-SP6').save()
    Param_organizations(id=uuid.uuid4(),authorized_value='HBP-SP7').save()
    Param_organizations(id=uuid.uuid4(),authorized_value='HBP-SP8').save()
    Param_organizations(id=uuid.uuid4(),authorized_value='HBP-SP9').save()
    Param_organizations(id=uuid.uuid4(),authorized_value='HBP-SP10').save()
    Param_organizations(id=uuid.uuid4(),authorized_value='HBP-SP11').save()
    Param_organizations(id=uuid.uuid4(),authorized_value='HBP-SP12').save()
    Param_organizations(id=uuid.uuid4(),authorized_value='Blue Brain Project').save() 
    Param_organizations(id=uuid.uuid4(),authorized_value='Other').save()  
    Param_organizations(id=uuid.uuid4(),authorized_value='KOKI-UNIC').save()
    Param_organizations(id=uuid.uuid4(),authorized_value='KTH-UNIC').save()
    Param_organizations(id=uuid.uuid4(),authorized_value='<<empty>>').save()


        
def create_test_types(): 
    Param_TestType(id=uuid.uuid4(),authorized_value='single cell activity').save()
    Param_TestType(id=uuid.uuid4(),authorized_value='network structure').save()
    Param_TestType(id=uuid.uuid4(),authorized_value='network activity').save()
    Param_TestType(id=uuid.uuid4(),authorized_value='behaviour').save()
    Param_TestType(id=uuid.uuid4(),authorized_value='subcellular').save()   
    
def create_score_type(): 
    Param_ScoreType(id=uuid.uuid4(),authorized_value='p-value').save()
    Param_ScoreType(id=uuid.uuid4(),authorized_value='Rsquare').save()
    Param_ScoreType(id=uuid.uuid4(),authorized_value='number').save()
    Param_ScoreType(id=uuid.uuid4(),authorized_value='Zscore').save()
    Param_ScoreType(id=uuid.uuid4(),authorized_value='purcentage').save()
    Param_ScoreType(id=uuid.uuid4(),authorized_value='Other').save()


def create_species():
    Param_Species(id=uuid.uuid4(),authorized_value='Mouse (Mus musculus)').save()
    Param_Species(id=uuid.uuid4(),authorized_value='Rat (Rattus rattus)').save()
    Param_Species(id=uuid.uuid4(),authorized_value='Marmoset (callithrix jacchus)').save()
    Param_Species(id=uuid.uuid4(),authorized_value='Human (Homo sapiens)').save()
    Param_Species(id=uuid.uuid4(),authorized_value='Paxinos Rhesus Monkey (Macaca mulatta)').save()
    Param_Species(id=uuid.uuid4(),authorized_value='Opossum (Monodelphis domestica)').save()
    Param_Species(id=uuid.uuid4(),authorized_value='Other').save()
    
def create_brain_region():
    Param_BrainRegion(id=uuid.uuid4(),authorized_value='Basal Ganglia').save()
    Param_BrainRegion(id=uuid.uuid4(),authorized_value='Cerebellum').save()
    Param_BrainRegion(id=uuid.uuid4(),authorized_value='Cortex').save()
    Param_BrainRegion(id=uuid.uuid4(),authorized_value='Hippocampus').save()
    Param_BrainRegion(id=uuid.uuid4(),authorized_value='Other').save()
    
def create_cell_type():
    Param_CellType(id=uuid.uuid4(),authorized_value='Granule Cell').save()
    Param_CellType(id=uuid.uuid4(),authorized_value='Interneuron').save()
    Param_CellType(id=uuid.uuid4(),authorized_value='Pyramidal Cell').save()
    Param_CellType(id=uuid.uuid4(),authorized_value='Other').save()     
    
def create_model_type():
    Param_ModelType(id=uuid.uuid4(),authorized_value='Single Cell').save()
    Param_ModelType(id=uuid.uuid4(),authorized_value='Network').save()
    Param_ModelType(id=uuid.uuid4(),authorized_value='Mean Field').save()
    Param_ModelType(id=uuid.uuid4(),authorized_value='Other').save()

def create_models_test_results(param_app_id, result_storage):
    
    current_time = time.time()

    # result_storage = "collab:///2169/folder_test"

    ##params
    # app_id = 38111
    app_id = param_app_id

    ##times
    time1 = current_time
    time2 = time1 + 11000
    time3 = time2+ 11000
    time4 = time3+ 11000

    ##tests
    uuid_test1 = uuid.uuid4()
    uuid_test2 = uuid.uuid4()
    uuid_test3 = uuid.uuid4()

    uuid_testcode1_1 = uuid.uuid4()
    uuid_testcode2_1 = uuid.uuid4()
    uuid_testcode3_1 = uuid.uuid4()

    uuid_testcode1_2 = uuid.uuid4()
    uuid_testcode2_2 = uuid.uuid4()
    uuid_testcode3_2 = uuid.uuid4()


    #model
    uuid_model1 = uuid.uuid4()

    uuid_model_version1 = uuid.uuid4()
    uuid_model_version2 = uuid.uuid4()
    uuid_model_version3 = uuid.uuid4()

    uuid_result1 = uuid.uuid4()
    uuid_result2 = uuid.uuid4()
    uuid_result3 = uuid.uuid4()
    uuid_result4 = uuid.uuid4()
    uuid_result5 = uuid.uuid4()
    uuid_result6 =uuid.uuid4()
    uuid_result7 = uuid.uuid4()
    uuid_result8 = uuid.uuid4()
    uuid_result9 = uuid.uuid4()
    uuid_result10 = uuid.uuid4()
    uuid_result11 = uuid.uuid4()
    uuid_result12 = uuid.uuid4()
    uuid_result13 = uuid.uuid4()

    uuid_result1_2 = uuid.uuid4()
    uuid_result2_2 = uuid.uuid4()
    uuid_result3_2 = uuid.uuid4()
    uuid_result4_2 = uuid.uuid4()
    uuid_result5_2 = uuid.uuid4()
    uuid_result6_2 = uuid.uuid4()
    uuid_result7_2 = uuid.uuid4()
    uuid_result8_2 = uuid.uuid4()
    uuid_result9_2 = uuid.uuid4()

    uuid_result4_21 = uuid.uuid4()
        
    test1 = create_specific_test(uuid_test1,"name 1","T1")
    test2 = create_specific_test(uuid_test2, "name 2","T2")
    test3 = create_specific_test(uuid_test3,"name 3","T3")

    testcode1 = create_specific_testcode(uuid_testcode1_1,"1.1","2017-01-24T14:59:26.031Z", test1)
    testcode2 = create_specific_testcode(uuid_testcode2_1,"1.1","2017-01-24T14:59:26.031Z",test2)
    testcode3 = create_specific_testcode(uuid_testcode3_1,"1.1","2017-01-24T14:59:26.031Z", test3)
    testcode1_2 = create_specific_testcode(uuid_testcode1_2,"2.1","2018-01-24T14:59:26.031Z",test1)
    testcode2_2 = create_specific_testcode(uuid_testcode2_2,"2.1", "2018-01-24T14:59:26.031Z",test2)
    testcode3_2 = create_specific_testcode(uuid_testcode3_2, "2.1","2018-01-24T14:59:26.031Z", test3)


    model1 = create_specific_model (uuid_model1,"model for result test", "M1", app_id)
  
    model_version1 = create_specific_modelinstance (uuid_model_version1, model1, "version 1")
    model_version2 = create_specific_modelinstance (uuid_model_version2, model1, "version 2")
    model_version3 = create_specific_modelinstance (uuid_model_version3, model1, "version 3")


    create_specific_result(uuid_result1, model_version1, testcode1, result_storage, 0.1111, time1)
    create_specific_result(uuid_result2, model_version1, testcode2, result_storage, 0.1211, time1)
    create_specific_result(uuid_result3, model_version1, testcode3, result_storage, 0.1311, time1)
    create_specific_result(uuid_result4, model_version2, testcode1, result_storage, 0.2111, time2)
    create_specific_result(uuid_result5, model_version2, testcode2, result_storage, 0.2211, time2)
    create_specific_result(uuid_result12, model_version2, testcode2, result_storage, 0.2212, time2)
    create_specific_result(uuid_result13, model_version2, testcode2, result_storage, 0.2213, time2)
    create_specific_result(uuid_result6, model_version2, testcode3, result_storage, 0.2311, time2)
    create_specific_result(uuid_result7, model_version3, testcode3_2, result_storage, 0.3111, time3)
    create_specific_result(uuid_result8, model_version3, testcode2, result_storage, 0.3211, time3)
    create_specific_result(uuid_result9, model_version3, testcode2, result_storage, 0.3212, time3)
    create_specific_result(uuid_result10, model_version3, testcode2, result_storage,  0.3213, time3)
    create_specific_result(uuid_result11, model_version3, testcode3, result_storage,  0.3311, time3)
    create_specific_result(uuid_result1_2, model_version1, testcode1_2, result_storage, 0.1121, time1)
    create_specific_result(uuid_result2_2, model_version1, testcode2_2, result_storage, 0.1221, time1)
    create_specific_result(uuid_result3_2, model_version1, testcode3_2, result_storage, 0.1321, time1)
    create_specific_result(uuid_result4_2, model_version2, testcode1_2, result_storage, 0.2121, time2)
    create_specific_result(uuid_result4_21, model_version2, testcode1_2, result_storage, 0.2122, time2)
    create_specific_result(uuid_result5_2, model_version2, testcode2_2, result_storage, 0.2221, time2)
    create_specific_result(uuid_result6_2, model_version2, testcode3_2, result_storage, 0.2321, time2)
    create_specific_result(uuid_result7_2, model_version3, testcode1_2, result_storage, 0.3121, time3)
    create_specific_result(uuid_result8_2, model_version3, testcode2_2, result_storage,0.3221, time3)
    create_specific_result(uuid_result9_2, model_version3, testcode3_2, result_storage, 0.3321, time3)

def create_specific_test (
                    uuid, 
                    name, 
                    alias, 
                    species="Mouse (Mus musculus)",
                    brain_region = "Hippocampus", 
                    cell_type = "Interneuron", 
                    age = "12",  
                    data_location = "http://bbbb.com", 
                    data_type = "data type",
                    data_modality = "electrophysiology",
                    test_type = "single cell activity",
                    protocol ="protocol",
                    author = "me",
                    publication = "not published",
                    score_type="p-value",
                    ): 
    test1 = ValidationTestDefinition()
    test1.id = uuid
    test1.name = name
    test1.alias = alias
    test1.species = species
    test1.brain_region = brain_region
    test1.cell_type = cell_type
    test1.age = age
    test1.data_location = data_location
    test1.data_type = data_type
    test1.data_modality = data_modality
    test1.test_type = test_type
    test1.protocol =protocol
    test1.author = author
    test1.publication = publication
    test1.score_type=score_type
    test1.save()
    return (test1)

def create_specific_model (
                    uuid, 
                    name, 
                    alias, 
                    app_id,
                    description = "description",
                    species = "Mouse (Mus musculus)",
                    brain_region = "Hippocampus",
                    cell_type = "Interneuron",
                    author = "me",
                    model_type = "Single Cell",
                    private = "0",
                    code_format = "py",
                    organization="",
                    
                    ):
    model1 = ScientificModel()
    model1.id = uuid         
    model1.name = name
    model1.alias = alias
    model1.description = description
    model1.species = species
    model1.brain_region = brain_region
    model1.cell_type = cell_type
    model1.author = author
    model1.model_type = model_type
    model1.private = private
    model1.app_id = app_id
    model1.code_format = code_format
    model1.organization = organization

    model1.save()   
    return (model1)

def create_specific_modelinstance (
                            uuid, 
                            model,  
                            version,
                            parameters = "param",
                            source = "http://dd.com",
                            
                            ):
    model_version1 = ScientificModelInstance()
    model_version1.id = uuid
    model_version1.model = model
    model_version1.version = version
    model_version1.parameters = parameters
    model_version1.source = source
    model_version1.save()
    return (model_version1)

def create_specific_testcode (
                            uuid, 
                            version, 
                            timestamp, 
                            test,
                            repository = "",
                            path = "",
                            
                            ):
    testcode1 = ValidationTestCode()
    testcode1.id = uuid
    testcode1.repository = repository
    testcode1.version = version
    testcode1.path = path
    testcode1.timestamp = timestamp
    testcode1.test_definition = test
    testcode1.save()
    return (testcode1)

def create_specific_result (
                            uuid, 
                            model_version, 
                            test_code, 
                            result_storage, 
                            score, 
                            date_time = time.time(),
                            platform = "azerty",
                            project = "azerty",
                            
                            ): 
    result = ValidationTestResult()
    result.id = uuid
    result.model_version = model_version
    result.test_code = test_code
    result.results_storage = result_storage
    result.score= score
    result.normalized_score= result.score
    result.passed = None
    result.timestamp = datetime.datetime.fromtimestamp(date_time).strftime('%Y-%m-%d %H:%M:%S')
    result.platform = platform
    result.project = project
    result.save()
    return (result)

def create_specific_ticket (
                            uuid,
                            test,
                            author ="me",
                            title = "title",
                            text = "text",
                            creation_date = time.time(),
                            ):
    ticket = Tickets(id = uuid, test= test)
    ticket.author = author
    ticket.title = title
    ticket.text = text
    ticket.creation_date = creation_date
    ticket.save()    
    return (ticket)


def create_specific_comment (
                            uuid,
                            ticket,
                            author ="me",
                            text = "text",
                            creation_date = time.time(),
                            ):
    comment = Comments(id = uuid, Ticket= ticket)
    comment.author = author
    comment.text = text
    comment.creation_date = creation_date
    comment.save()
    return (comment)
    
def create_specific_image (
                            uuid,
                            model,
                            url = "http://.aa.com",
                            caption = "caption",
                            ):
    image = ScientificModelImage(id= uuid, model=model)
    image.url = url
    image.caption = caption
    image.save()
    return (image)