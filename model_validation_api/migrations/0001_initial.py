# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import uuid


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ScientificModel',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, serialize=False, editable=False, primary_key=True)),
                ('name', models.CharField(help_text=b'short descriptive name', max_length=200)),
                ('description', models.TextField()),
                ('species', models.CharField(help_text=b'species', max_length=100, blank=True)),
                ('brain_region', models.CharField(help_text=b'brain region, if applicable', max_length=100, blank=True)),
                ('cell_type', models.CharField(help_text=b'cell type, for single-cell models', max_length=100, blank=True)),
                ('author', models.TextField(help_text=b'Author(s) of this model')),
                ('source', models.URLField(help_text=b'Version control repository containing the source code of the model')),
            ],
        ),
        migrations.CreateModel(
            name='ScientificModelInstance',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('version', models.CharField(max_length=64)),
                ('parameters', models.TextField()),
                ('model', models.ForeignKey(related_name='instances', to='model_validation_api.ScientificModel')),
            ],
        ),
        migrations.CreateModel(
            name='ValidationTestCode',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('repository', models.CharField(help_text=b'location of the code that defines the test', max_length=200)),
                ('version', models.CharField(help_text=b'version of the code that defines the test', max_length=128)),
                ('path', models.CharField(help_text=b'path to test class within Python code', max_length=200)),
                ('timestamp', models.DateTimeField(help_text=b'timestamp for this version of the code', auto_now_add=True)),
            ],
            options={
                'get_latest_by': 'timestamp',
                'verbose_name_plural': 'validation test code',
            },
        ),
        migrations.CreateModel(
            name='ValidationTestDefinition',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(help_text=b'short descriptive name', max_length=200)),
                ('species', models.CharField(help_text=b'species', max_length=100)),
                ('brain_region', models.CharField(help_text=b'brain region', max_length=100)),
                ('cell_type', models.CharField(help_text=b'cell type', max_length=100)),
                ('age', models.CharField(help_text=b"age of animal, e.g. '6 weeks'", max_length=50, null=True)),
                ('data_location', models.CharField(help_text=b'location of comparison data', max_length=200)),
                ('data_type', models.CharField(help_text=b'type of comparison data (number, histogram, time series, etc.)', max_length=100)),
                ('data_modality', models.CharField(help_text=b'recording modality for comparison data (ephys, fMRI, 2-photon, etc)', max_length=100, choices=[(b'ephys', b'electrophysiology'), (b'fMRI', b'fMRI'), (b'2-photon', b'2-photon imaging'), (b'em', b'electron microscopy'), (b'histology', b'histology')])),
                ('test_type', models.CharField(help_text=b'single cell activity, network structure, network activity, subcellular', max_length=100, choices=[(b'single cell', b'single cell activity'), (b'network structure', b'network structure'), (b'network activity', b'network activity'), (b'behaviour', b'behaviour'), (b'subcellular', b'subcellular')])),
                ('protocol', models.TextField(help_text=b'Description of the experimental protocol', blank=True)),
                ('author', models.CharField(help_text=b'Author of this test', max_length=100)),
                ('publication', models.CharField(help_text=b'Publication in which the validation data set was reported', max_length=200, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='ValidationTestResult',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('test_definition', models.URLField(help_text=b'URI of the validation test definition')),
                ('results_storage', models.TextField(help_text=b'Location of data files produced by the test run')),
                ('result', models.FloatField(help_text=b'A numerical measure of the difference between model and experiment')),
                ('passed', models.NullBooleanField(help_text=b'Whether the test passed or failed')),
                ('timestamp', models.DateTimeField(help_text=b'Timestamp of when the simulation was run', auto_now_add=True)),
                ('platform', models.TextField(help_text=b'Computer system on which the simulation was run')),
                ('model_instance', models.ForeignKey(to='model_validation_api.ScientificModelInstance')),
            ],
        ),
        migrations.AddField(
            model_name='validationtestcode',
            name='test_definition',
            field=models.ForeignKey(related_name='code', to='model_validation_api.ValidationTestDefinition', help_text=b'Validation test implemented by this code'),
        ),
    ]
