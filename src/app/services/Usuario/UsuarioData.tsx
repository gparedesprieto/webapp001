import { convertirJsonAString } from '../../functions/convertirJsonAString';
import { listarUsuarioPagina } from '../../promises/Usuario/usuarioEvaluate';

export const UsuarioData = async (page, pageSize, sortModel, filterModel, valueFiltro) => {

    // Simulación de API call para obtener datos paginados
    //await new Promise(resolve => setTimeout(resolve, 5000));

    /*
    console.log("fetchPaginatedData:" + page + ",pageSize:" + pageSize + ",sortModel:" + sortModel + ",filterModel:" + filterModel)
    console.dir(filterModel)
    console.dir(sortModel)
    console.dir(valueFiltro)
    */

    const fieldValuePairs = filterModel.items.map(item => `${item.field}=${item.value}`).join(',');
    //console.log(fieldValuePairs);

    let _filtros = null
    
    if (fieldValuePairs)
      _filtros = fieldValuePairs
    else
      if (valueFiltro)
        _filtros = convertirJsonAString(JSON.parse(valueFiltro));

    //console.log(_filtros)

    const input = {
        payload: {
            pagina: page + 1, // Backend suele usar 1-based indexing
            paginaTamanio: pageSize,
            ordenCampo: (sortModel[0]? sortModel[0]?.field: ''),
            ordenDireccion: (sortModel[0]? sortModel[0]?.sort: ''),
            filtros: _filtros
        }
    };
  
    const res = await listarUsuarioPagina(input)
    //console.dir(res)
    
    let paginatedData =  [];
    let dataRows = 0;
    
    if (!Array.isArray(res) || res.length === 0) {
      console.log("No hay usuarios");
      paginatedData = [];
    }
    else {
      paginatedData = res;
      dataRows = res[0].total_count;
    } 

    return {
        data: paginatedData,
        total: dataRows,
        page,
        pageSize
    };
};