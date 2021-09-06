import React, { useState, useEffect } from 'react';
import BannerSection from "../../../components/BannerSection";
import FollowUs from "../../../components/FollowUs";
import SimpleReactValidator from 'simple-react-validator';
import api from '../../../utils/api';
import CategoryForm from './CategoryForm';

const FormCategoryPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async (type) => {
    try {
      const response = await api.category.get({type: 'articles'},
        { headers: { 'Content-Type': 'application/json' } }
      );
        
      if (response.data) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const save = async () => {
    const data = {
      type: 'articles',
      data: categories
    };
    try {
      const response = await api.category.put(data, { 
        header: { 'Content-Type': 'application/json' } 
      });
    } catch (error) {
      console.log(error);
    } 
  }

  const hanleCategory = (item, key) => {
    let newCategories = [...categories];
    newCategories.forEach((element, k) => {
      if (element.key == key) {
        newCategories[k].nodes.push(item);
      } else {
        element.nodes.forEach((elementChild, ec) => {
          if (elementChild.key == key) {
            newCategories[k].nodes[ec].nodes.push(item);
          } else {
            elementChild.nodes.forEach((child, c) => {
              if (child.key == key) {
                newCategories[k].nodes[ec].nodes[c].nodes.push(item);
              }
            });
          }
        });
      }
    });
    setCategories(newCategories);
  }

  return (
    <>
      <div className="contact_form padding-bottom">
        <div className="container">
          <div className="space-50" />
          <div className="row">
            <div className="col-lg-8">
              <div className="cotact_form">
                <div className="row">
                  <div className="col-12">
                    <h3>Crear Categoria!</h3>
                  </div>
                  <div>
                    {categories.map(category => (
                      <>
                        <div>{category.label}</div>
                        <CategoryForm handleCategory={(data) => hanleCategory(data, category.key)} />
                        <div>
                          {category.nodes.map(firstChild => (
                            <>
                              <div>{firstChild.label}</div>
                              <CategoryForm handleCategory={(data) => hanleCategory(data, firstChild.key)} />
                              <div>
                                {firstChild.nodes.map(secondChild => (
                                  <>
                                    <div>{secondChild.label}</div>
                                    <CategoryForm handleCategory={(data) => hanleCategory(data, secondChild.key)} />
                                  </>
                                ))}
                              </div>
                            </>
                          ))}
                        </div>
                      </>
                    ))}
                  </div>
                  <div>
                    <button onClick={save}>Guardar</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <FollowUs title="Redes Sociales" />
            </div>
          </div>
        </div>
      </div>
      <BannerSection />
    </>
  );
}

export default FormCategoryPage;