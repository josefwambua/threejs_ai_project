import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import config from '../config/config';
import state from '../store';
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import {
  CustomButton,
  AIPicker,
  ColorPicker,
  FilePicker,
  Tab,
} from '../assets/components';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { FaceLandmarkerDefaults } from '@react-three/drei';

const customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState('');

  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState('');
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  // show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker />;
      case 'filepicker':
        return <FilePicker 
        file={file}
        setFile={setFile}
        readFile ={readFile}

        />;
      case 'aipicker':
        return <AIPicker 
        prompt={prompt}
        setPrompt={setPrompt}
        generatingImg ={generatingImg}
        handleSubmit ={handleSubmit}

        />;
      default:
        return null;
    }
  };
  const handleSubmit = async (type) => {
    if(!prompt) return alert('Please enter a prompt')
    try {
      // by calling backend to  gen ai img/txt
      setGeneratingImg(true);
      const response = await fetch('http://localhost:8080/api/v1/dalle', {
        method : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
        })
      })

  
      const data = await response.json();

      console.log('Server response:', data);
      
      const imageBase64 = data.image;
      
      if (imageBase64) {
        console.log('Image base64:', imageBase64);
        handleDecals(type, `data:image/png;base64,${imageBase64}`);
      } else {
        console.error('Invalid server response: photo is undefined');
      }
      

  } catch (error){
    alert(error)
  }finally {
    setGeneratingImg(false);
    setActiveEditorTab("");
  }
  }
  

  

  const handleDecals = (type, result) => {
    if (result) {
      const decalType = DecalTypes[type];
      state[decalType.stateProperty] = result;
      if (!activeFilterTab[decalType.isFilterTab]) {
        handleActiveFilterTab(decalType.isFilterTab);
      }
    
  }
  }

  
  const handleActiveFilterTab = (tabName) => {
    switch(tabName){
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
      break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
      default:
        state.isFullTexture =false;
        state.isLogoTexture =true;
        
    }
    // after setting the state, activeFilterTab is Updated

    setActiveFilterTab((prevState) =>{
      return{
        ...prevState,
        [tabName] : !prevState[tabName]
      }
    })

  }
  const readFile = (type) => {
    reader(file)
    .then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    })

  }
  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation('left')}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    isActiveTab={activeEditorTab === tab.name}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div className="absolute z-10 top-5 right-5" {...fadeAnimation}>
            <CustomButton
              type="filled"
              title="Go back"
              handleClick={() => (state.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
          <motion.div
            className="filtertabs-container"
            {...slideAnimation('up')}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeEditorTab [tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default customizer;
