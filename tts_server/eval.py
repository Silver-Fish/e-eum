from network import Tacotron
from data import get_dataset, DataLoader, collate_fn, get_param_size, inv_spectrogram, find_endpoint, save_wav, spectrogram
import numpy as np
import argparse
import os
import torch
import io
from text.symbols import symbols, en_symbols
import hyperparams as hp
from text import text_to_sequence

def init():
    print('start', flush=True)
    global device
    device = torch.device('cuda:0')
    
    if 'english' in hp.cleaners:
        _symbols = en_symbols
        
    elif 'korean' in hp.cleaners:
        _symbols = symbols

    global model 
    model = Tacotron(len(_symbols)).to(device)


    #checkpoint = torch.load(args.checkpoint_path)
    checkpoint = torch.load('./pre_trained_model_path/checkpoint_43000.pth.tar')
    model.load_state_dict(checkpoint['model'])

    model = model.eval()
    # print('init~~~~~~~end', flush=True)   

def main(path, word):

    # print('main~~~~~~~start', flush=True)
    sentences = [word]

    # Text to index sequence

    for i, ele in enumerate(sentences):
        cleaner_names = [x.strip() for x in hp.cleaners.split(',')]
        seq = np.expand_dims(np.asarray(text_to_sequence(ele), dtype=np.int32), axis=0)

        # Provide [GO] Frame
        mel_input = np.zeros([seq.shape[0], hp.num_mels, 1], dtype=np.float32)

        # Variables
        characters = torch.from_numpy(seq).type(torch.cuda.LongTensor).to(device)
        mel_input = torch.from_numpy(mel_input).type(torch.cuda.FloatTensor).to(device)
        mel_input = torch.transpose(mel_input, 1, 2)

        # Spectrogram to wav
        mel_output, linear_output = model(characters, mel_input, False)
        # print('---------TTS------------1', flush=True)
        linear_output = torch.transpose(linear_output, 1, 2)
        # print('---------TTS------------2', flush=True)
        wav = inv_spectrogram(linear_output[0].data.cpu().numpy())
        # print('---------TTS------------3', flush=True)
        _wav = wav[:find_endpoint(wav)]
        # print('---------TTS------------4', flush=True)
        out = io.BytesIO()
        # print('---------TTS------------5', flush=True)
        save_wav(_wav, out)
        # print('---------TTS------------6', flush=True)
        tt = out.getvalue()
        # print('---------TTS------------7', flush=True)
        f = open('./result/temp.wav', 'wb')
        f.write(tt)
        f.close()
    
    print('end', flush=True)
    
#if __name__ == '__main__':
#    parser = argparse.ArgumentParser()
#    parser.add_argument('--text/', type=str, help='Put the text you want to speech')
#    parser.add_argument('--path/', type=str, help='Put the text you want to speech')
#    args = parser.parse_args()
#    main(args)
