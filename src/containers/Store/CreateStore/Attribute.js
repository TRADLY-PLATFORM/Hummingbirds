/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import classes from './Attribute.module.css';
import Select from 'react-select';
import groupAvatar from '../../../assets/images/uploadPlaceholder.svg';
 import CreatableSelect from 'react-select/creatable';
import uploadImageIcon from "../../../assets/images/store/upload@2x.png"
 import cancelImage from '../../../assets/images/store/cancel@2x.png';


const Attribute = ({ attribute, attributeData, setAttributeData }) => {
  // statte
   const [file, setFile] = useState(null);

  // functions

  const imageUploadClick = () => {
    let fileInput = document.getElementById('attachmentClick');
    fileInput.click();
  };

  const imageUpload = async (e, attribute_id) => {
    setFile(e.target.files[0]);
    if (attributeData !== null) {
      const check = attributeData?.find((attr) => attr.id === attribute_id);
      if (check === undefined) {
           setAttributeData([...attributeData, { values: [e.target.files[0]], id: attribute_id,uploadFile:true }]);
        
      } else {
       const findOut = attributeData.filter((attr) => attr.id !== attribute_id);
       setAttributeData([
         ...findOut,
         { values: [e.target.files[0]], id: attribute_id, uploadFile: true },
       ]);
      }
    } else {
        setAttributeData([{ values: [e.target.files[0]], id: attribute_id, uploadFile: true }]);
    }
  };

  const handleChange = (newValue, actionMeta, attribute_id, attribute_field_type) => {
     
    if (attribute_field_type === 1 || attribute_field_type === 3) {
      if (attributeData !== null) {
         const check = attributeData?.find((attr) => attr.id === attribute_id);
        if (check === undefined) {
          if (attribute_field_type === 1) {
            setAttributeData([...attributeData, { values: [newValue.id], id: attribute_id }]);
          } else if (attribute_field_type === 3) {
            setAttributeData([...attributeData, { values: [newValue.value], id: attribute_id }]);
          }
        } else {
          const findOut = attributeData.filter((attr) => attr.id !== attribute_id);
          if (attribute_field_type === 1) {
            setAttributeData([...findOut, { values: [newValue.id], id: attribute_id }]);
          } else if (attribute_field_type === 3) {
            setAttributeData([...findOut, { values: [newValue.value], id: attribute_id }]);
          }
        }
      } else {
 
        if (attribute_field_type === 1) {
          setAttributeData([{ values: [newValue.id], id: attribute_id }]);
        } else if (attribute_field_type === 3) {
          setAttributeData([{ values: [newValue.value], id: attribute_id }]);
        }
      }
    } else if (attribute_field_type === 2 || attribute_field_type === 4) {
     if (attributeData !== null) {
       if (actionMeta.action !== 'remove-value' || 'clear') {
         const check = attributeData.find((attr) => attr.id === attribute_id);
         if (check === undefined) {
           if (attribute_field_type === 2) {
             setAttributeData([
               ...attributeData,
               { values: newValue.map((singleValue) => singleValue.id), id: attribute_id },
             ]);
           } else if (attribute_field_type === 4) {
             setAttributeData([
               ...attributeData,
               { values: newValue.map((singleValue) => singleValue.value), id: attribute_id },
             ]);
           }
         } else {
           const findOut = attributeData.filter((attr) => attr.id !== attribute_id);
           if (attribute_field_type === 2) {
             setAttributeData([
               ...findOut,
               { values: newValue.map((singleValue) => singleValue.id), id: attribute_id },
             ]);
           } else if (attribute_field_type === 4) {
             setAttributeData([
               ...findOut,
               { values: newValue.map((singleValue) => singleValue.value), id: attribute_id },
             ]);
           }
         }
       } else {
         if (newValue.length) {
           const findOut = attributeData.filter((attr) => attr.id !== attribute_id);
           if (attribute_field_type === 2) {
             setAttributeData([
               ...findOut,
               { values: newValue.map((singleValue) => singleValue.id), id: attribute_id },
             ]);
           } else if (attribute_field_type === 4) {
             setAttributeData([
               ...findOut,
               { values: newValue.map((singleValue) => singleValue.value), id: attribute_id },
             ]);
           }
         } else {
           const findOut = attributeData.filter((attr) => attr.id !== attribute_id);
           if (attribute_field_type === 2) {
             setAttributeData([...findOut]);
           } else if (attribute_field_type === 4) {
             setAttributeData([...findOut]);
           }
         }
       }
     } else {
       if (attribute_field_type === 2) {
         setAttributeData([
           { values: newValue.map((singleValue) => singleValue.id), id: attribute_id },
         ]);
       } else if (attribute_field_type === 4) {
         setAttributeData([
           { values: newValue.map((singleValue) => singleValue.value), id: attribute_id },
         ]);
       }
     }
    }
  };

 
 
  return (
    <>
     
      {attribute?.map((attr) => {
        // Data
        let options;
        if (attr.field_type === 1 || attr.field_type === 2) {
          options = attr.values?.map((value) => {
            return { value: value.name, label: value.name, id: value.id };
          });
        }
        return (
          <>
            <div className={classes.addgroup}>
              {attr.field_type === 1 && (
                <div className="form-group mt-2 ">
                  <label className={attr.optional ? '' : classes.required}>{attr.name}</label>
                  <Select
                    onChange={(newValue, actionMeta) =>
                      handleChange(newValue, actionMeta, attr.id, attr.field_type)
                    }
                    placeholder={'Select your' + ' ' + attr.name}
                    options={options}
                  />
                </div>
              )}
              {attr.field_type === 2 && (
                <div className="form-group mt-2 ">
                  <label className={attr.optional ? '' : classes.required}>{attr.name}</label>
                  <Select
                    placeholder={'Select your' + ' ' + attr.name}
                    isMulti
                    name="colors"
                    options={options}
                    onChange={(newValue, actionMeta) =>
                      handleChange(newValue, actionMeta, attr.id, attr.field_type)
                    }
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </div>
              )}
              {attr.field_type === 3 && (
                <div className="form-group mt-2 ">
                  <label className={attr.optional ? '' : classes.required}>{attr.name}</label>
                  <CreatableSelect
                    placeholder={'Type your' + ' ' + attr.name}
                    onChange={(newValue, actionMeta) =>
                      handleChange(newValue, actionMeta, attr.id, attr.field_type)
                    }
                  />
                </div>
              )}
              {attr.field_type === 4 && (
                <div className="form-group mt-2 ">
                  <label className={attr.optional ? '' : classes.required}>{attr.name}</label>
                  <CreatableSelect
                    placeholder={'Type your' + ' ' + attr.name}
                    isMulti
                    onChange={(newValue, actionMeta) =>
                      handleChange(newValue, actionMeta, attr.id, attr.field_type)
                    }
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </div>
              )}
              {attr.field_type === 5 &&
                (file === null ? (
                  <div className={classes.attachMentBox}>
                    <div>
                      <div style={{ height: '0px', overflow: 'hidden' }}>
                        <input
                          type="file"
                          id="attachmentClick"
                          name="imageUpload"
                          accept="image/*"
                          onChange={(e) => imageUpload(e,attr.id)}
                        />
                      </div>
                      <button className={classes.photoUploadButton} onClick={imageUploadClick}>
                        <img src={uploadImageIcon} alt="" />
                        <p>Upload Attachment Image</p>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={classes.uploadedImage}>
                    <div>
                      <img src={groupAvatar} alt="" />
                    </div>
                    <div className={classes.imageDescriptions}>
                      <span>{file.name}</span>
                      <span>{file.type}</span>
                    </div>
                    <div className={classes.cancelImage} onClick={() => setFile(null)}>
                      <img src={cancelImage} alt="" />
                    </div>
                  </div>
                ))}
            </div>
          </>
        );
      })}
    </>
  );
};

export default Attribute;





