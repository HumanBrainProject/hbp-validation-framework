

from hbp_validation_framework import ModelCatalog, TestLibrary

ADMIN_USERNAME = "adavison"

mc = ModelCatalog(username=ADMIN_USERNAME)
tl = TestLibrary.from_existing(mc)

all_models = mc.list_models()

test_models = [model for model in all_models if model["name"].startswith("[-TEST-]")]

for model in test_models:
    try:
        mc.delete_model(model_id=model["id"])
        print("OK - model ", model["id"])
    except Exception as err:
        print("ERROR - model ", model["id"], str(err))

all_tests = tl.list_tests()

test_tests = [test for test in all_tests if test["name"].startswith("[-TEST-]")]

for test in test_tests:
    try:
        tl.delete_test(test_id=test["id"])
        print("OK - test ", test["id"])
    except Exception as err:
        print("ERROR - test ", test["id"], str(err))
