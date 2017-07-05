from django.core.management.base import BaseCommand
from ...models import Param_Species, Param_DataModalities, Param_TestType, Param_BrainRegion, Param_CellType, Param_ModelType, CollabParameters

class Command(BaseCommand):
    args = '<foo bar ...>'
    help = 'our help string comes here'    

    def _create_data_modalities(self):
        Param_DataModalities(authorized_value='electrophysiology').save()
        Param_DataModalities(authorized_value='fMRI').save()
        Param_DataModalities(authorized_value='2-photon imaging').save()
        Param_DataModalities(authorized_value='electron microscopy').save()
        Param_DataModalities(authorized_value='histology').save()   
        
    def _create_test_types(self): 
        Param_TestType(authorized_value='single cell activity').save()
        Param_TestType(authorized_value='network structure').save()
        Param_TestType(authorized_value='network activity').save()
        Param_TestType(authorized_value='behaviour').save()
        Param_TestType(authorized_value='subcellular').save()        

    def _create_species(self):
        Param_Species(authorized_value='Mouse (Mus musculus)').save()
        Param_Species(authorized_value='Rat (Rattus rattus)').save()
        Param_Species(authorized_value='Marmoset (callithrix jacchus)').save()
        Param_Species(authorized_value='Human (Homo sapiens)').save()
        Param_Species(authorized_value='Paxinos Rhesus Monkey (Macaca mulatta)').save()
        Param_Species(authorized_value='Opossum (Monodelphis domestica)').save()
        Param_Species(authorized_value='Other').save()
        
    def _create_brain_region(self):
        Param_BrainRegion(authorized_value='Basal Ganglia').save()
        Param_BrainRegion(authorized_value='Cerebellum').save()
        Param_BrainRegion(authorized_value='Cortex').save()
        Param_BrainRegion(authorized_value='Hippocampus').save()
        Param_BrainRegion(authorized_value='Other').save()
        
    def _create_cell_type(self):
        Param_CellType(authorized_value='Granule Cell').save()
        Param_CellType(authorized_value='Interneuron').save()
        Param_CellType(authorized_value='Pyramidal Cell').save()
        Param_CellType(authorized_value='Other').save()     
        
    def _create_model_type(self):
        Param_ModelType(authorized_value='Single Cell').save()
        Param_ModelType(authorized_value='Network').save()
        Param_ModelType(authorized_value='Mean Field').save()
        Param_ModelType(authorized_value='Other').save()


    def _fake_collab(self):
        collab1 = CollabParameters(id='1')
        collab1.save()

        collab1.data_modalities.add( Param_DataModalities.objects.get(authorized_value='electrophysiology') )
        collab1.test_type.add( Param_TestType.objects.get(authorized_value='subcellular'))
        collab1.species.add(Param_Species.objects.get(authorized_value='Other') )
        collab1.brain_region.add(Param_BrainRegion.objects.get(authorized_value='Hippocampus')  )
        collab1.cell_type.add(Param_CellType.objects.get(authorized_value='Interneuron'))
        collab1.model_type.add(Param_ModelType.objects.get(authorized_value='Single Cell') )

        collab1.save()



    def handle(self, *args, **options):
        self._create_data_modalities()
        self._create_test_types()
        self._create_species()
        self._create_brain_region()
        self._create_cell_type()
        self._create_model_type()
        # self._fake_collab()



