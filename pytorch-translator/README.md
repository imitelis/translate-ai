# PyTorch Translator

## Train
  *  Create a new virtual environment `venv` in python by running `python3 -m venv venv`
  *  Activate the virtual environment by executing `source venv/bin/activate`
  *  Installing all reqs from `reqs.txt` using `pip install -r reqs.txt`
  *  Then move to `seq2seq` folder, run `python3 trainer.py` for training the NN by yourself
  *  This is a very computationally expensive task, with taking around 30min to my NVIDIA GTX1050TI
  *  But it also depends on your `settings.py`. My recommended non-trivial setup was the same as the tutorial:
  `SOS_token = 0`, `EOS_token = 1`, `MAX_LENGTH = 30`, `hidden_size = 128`, `batch_size = 64`
  *  You can override those settings and run those by your own, particularly your own languages with datasets in data

## Loader
  *  After the train.py has successfully been executed, it should have saved the models at the same folder
  *  The remaining `eng-to-fra-encoder.pth` and `eng-to-fra-decoder.pth` attest the results of this task
  *  But now we want to reload them again so we can continue using them

## Docs
  *  Most of the results from this project are achieved at the pace of this tutorial:
  `https://pytorch.org/tutorials/intermediate/seq2seq_translation_tutorial.html`
  *  Besides of refactoring and modularizing this code, I didn't do any major changes
  *  The original Seq2Seq RNN was trained for a fra-to-eng translator.

## Data
  *  In the `data` folder you will find some `txt` files referring to the languages in the translators
  *  Just as in the original tutorial, I took the `eng-fra` data from the original `data.zip` there
  *  However, for the `esp-eng` data I used this recommended source from the tutorial too:
  `https://www.manythings.org/anki/`
  *  Although I had to clean that data and remove the copyrights in the third column for improving performance
  *  You can find some `png` pictures too, those are the attention plots for the french sentences from the tutorial