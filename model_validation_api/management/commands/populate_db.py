from django.core.management.base import BaseCommand
from ...models import Param_Species, Param_DataModalities, Param_TestType, Param_BrainRegion, Param_CellType, Param_ModelType

class Command(BaseCommand):
    args = '<foo bar ...>'
    help = 'our help string comes here'    

    def _create_data_modalities(self):
        Param_DataModalities(authorised_value='electrophysiology').save()
        Param_DataModalities(authorised_value='fMRI').save()
        Param_DataModalities(authorised_value='2-photon imaging').save()
        Param_DataModalities(authorised_value='electron microscopy').save()
        Param_DataModalities(authorised_value='histology').save()       
        
    def _create_test_types(self): 
        Param_TestType(authorised_value='single cell activity').save()
        Param_TestType(authorised_value='network structure').save()
        Param_TestType(authorised_value='network activity').save()
        Param_TestType(authorised_value='behaviour').save()
        Param_TestType(authorised_value='subcellular').save()        

    def _create_species(self):
        Param_Species(authorised_value='Mouse (Mus musculus)').save()
        Param_Species(authorised_value='Rat (Rattus rattus)').save()
        Param_Species(authorised_value='Marmoset (callithrix jacchus)').save()
        Param_Species(authorised_value='Human (Homo sapiens)').save()
        Param_Species(authorised_value='Paxinos Rhesus Monkey (Macaca mulatta)').save()
        Param_Species(authorised_value='Opossum (Monodelphis domestica)').save()
        Param_Species(authorised_value='Other').save()
        
    def _create_brain_region(self):
        Param_BrainRegion(authorised_value='Basal Ganglia').save()
        Param_BrainRegion(authorised_value='Cerebellum').save()
        Param_BrainRegion(authorised_value='Cortex').save()
        Param_BrainRegion(authorised_value='Hippocampus').save()
        Param_BrainRegion(authorised_value='Other').save()
        
    def _create_cell_type(self):
        Param_CellType(authorised_value='Granule Cell').save()
        Param_CellType(authorised_value='Interneuron').save()
        Param_CellType(authorised_value='Pyramidal Cell').save()
        Param_CellType(authorised_value='Other').save()     
        
    def _create_model_type(self):
        Param_ModelType(authorised_value='Single Cell').save()
        Param_ModelType(authorised_value='Network').save()
        Param_ModelType(authorised_value='Mean Field').save()
        Param_ModelType(authorised_value='Other').save()

    def handle(self, *args, **options):
        self._create_test_types()
        self._create_species()
        self._create_brain_region()
        self._create_cell_type()
        self._create_model_type()



