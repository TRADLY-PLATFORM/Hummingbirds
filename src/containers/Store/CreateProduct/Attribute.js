import React, { useState } from 'react';
import classes from './Attribute.module.css';
import Select from 'react-select';
import groupAvatar from '../../../assets/images/uploadPlaceholder.svg';
import imageToBase64 from 'image-to-base64/browser';
import CreatableSelect from 'react-select/creatable';
import { attr } from 'dom7';

const Attribute = ({ attribute, attributeData, setAttributeData }) => {
  // statte
  const [multiValue, setMultiValue] = useState([]);
  const [multiValueText, setMultiValueText] = useState('');
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState({});
  const [file, setFile] = useState(null);

  // functions

  const imageUploadClick = () => {
    let fileInput = document.getElementById('attachmentClick');
    fileInput.click();
  };

  const imageUpload = async (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);

    const file = e.target.files[0];

    imageToBase64(e.target.files[0]) // Path to the image
      .then((response) => {
        setBase64({ file: 'data:' + file.type + ';base64,' + response });
        console.log({ file: 'data:' + file.type + ';base64,' + response });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (newValue, actionMeta, attribute_id, attribute_field_type) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`attrId: ${actionMeta.action}`);

    console.groupEnd();
    if (attribute_field_type === (1 || 3)) {
      if (attributeData !== null) {
        console.log('here');
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
        console.log('here2');

        if (attribute_field_type === 1) {
          setAttributeData([{ values: [newValue.id], id: attribute_id }]);
        } else if (attribute_field_type === 3) {
          setAttributeData([{ values: [newValue.value], id: attribute_id }]);
        }
      }
    } else if (attribute_field_type === (2 || 4)) {
      if (attributeData !== null) {
        if (actionMeta.action !== ('remove-value' || 'clear')) {
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

  console.log('====================================');
  console.log(attributeData);
  console.log('====================================');

  // const valueChange = (newValue: any, actionMeta: any) => {
  //   console.group('Value Changed 2');
  //   console.log(newValue);
  //   console.log(`action: ${actionMeta.action}`);
  //   console.groupEnd();
  // };

  // const options = [
  //   { value: 'chocolate', label: 'Chocolate' },
  //   { value: 'strawberry', label: 'Strawberry' },
  //   { value: 'vanilla', label: 'Vanilla' },
  // ];

  return (
    <>
      {/* <CreatableSelect
        isClearable
        isMulti
        onChange={valueChange}
        className="basic-multi-select"
        classNamePrefix="select"
      /> */}
      {attribute?.map((attr) => {
        // Data
        let options;
        if (attr.field_type === 1 || 2) {
          options = attr.values?.map((value) => {
            return { value: value.name, label: value.name, id: value.id };
          });
        }
        return (
          <>
            <div className={classes.addgroup}>
              {attr.field_type === 1 && (
                <div className="form-group mt-2 ">
                  <Select
                    onChange={(newValue, actionMeta) =>
                      handleChange(newValue, actionMeta, attr.id, attr.field_type)
                    }
                    placeholder={attr.name}
                    options={options}
                  />
                </div>
              )}
              {attr.field_type === 2 && (
                <div className="form-group mt-2 ">
                  <Select
                    placeholder={attr.name}
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
                  <CreatableSelect
                    placeholder={attr.name}
                    onChange={(newValue, actionMeta) =>
                      handleChange(newValue, actionMeta, attr.id, attr.field_type)
                    }
                  />
                </div>
              )}
              {attr.field_type === 4 && (
                <div className="form-group mt-2 ">
                  <CreatableSelect
                    placeholder={attr.name}
                    isMulti
                    onChange={(newValue, actionMeta) =>
                      handleChange(newValue, actionMeta, attr.id, attr.field_type)
                    }
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </div>
              )}
              {attr.field_type === 5 && (
                <div className={classes.attachMentBox}>
                  <div className="p-2">
                    <img
                      id="imageid"
                      className={classes.groupAvatar}
                      src={image ? image : groupAvatar}
                      alt=""
                    />
                  </div>
                  <div>
                    <div style={{ height: '0px', overflow: 'hidden' }}>
                      <input
                        type="file"
                        id="attachmentClick"
                        name="imageUpload"
                        accept="image/*"
                        onChange={(e) => imageUpload(e)}
                      />
                    </div>
                    <button className={classes.photoUploadButton} onClick={imageUploadClick}>
                      Upload File
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        );
      })}
    </>
  );
};

export default Attribute;
