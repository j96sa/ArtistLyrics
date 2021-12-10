import React, { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Home } from "../components/Home";
import { MyLIst } from "../components/MyLIst";
import { SearchResult } from "../components/SearchResult";
import { ContextFavoriteProvider } from "../context/ContextFavorite";
import { ContextResizeProvider } from "../context/ContextResize";
import { ModesContextProvider } from "../context/modesContext";

export const Router = () => {
  //variable para controlar cual es el componente activo(en vista) y modificar el elemento link en el compoente HEADER
  const [currentComponent, setCurrentComponent] = useState("home");

  return (
    <HashRouter>
      <ContextFavoriteProvider>
      <ModesContextProvider>
      <ContextResizeProvider>
        <Routes>
          <Route exact path="/" element={<Home setCurrentComponent={setCurrentComponent} currentComponent={currentComponent}/>} />
          <Route exact path="/my-list" element={<MyLIst setCurrentComponent={setCurrentComponent} currentComponent={currentComponent}/>} />
          <Route exact path="/searchresult/:artist/:song" element={<SearchResult/>} />
        </Routes>
      </ContextResizeProvider>
      </ModesContextProvider>
      </ContextFavoriteProvider>
    </HashRouter>
  );
};
