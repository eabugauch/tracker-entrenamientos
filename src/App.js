import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Target, Award, Plus, Minus, Save, Download, Clock, Zap } from 'lucide-react';
import './App.css';

const TrainingTracker = () => {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentDay, setCurrentDay] = useState('lunes');
  const [showRoutine, setShowRoutine] = useState(false);
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('trainingData');
    return saved ? JSON.parse(saved) : {};
  });

  // Guardar datos automáticamente
  useEffect(() => {
    localStorage.setItem('trainingData', JSON.stringify(data));
  }, [data]);

  const days = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'dashboard'];
  
  const workoutStructure = {
    lunes: [
      { 
        name: 'Dominadas estrictas', 
        type: 'series_reps', 
        unit: 'repeticiones por serie',
        sets: '6 series',
        intensity: 'AL FALLO',
        rest: '3-4 min',
        restActivity: 'Flexiones x10 + estiramiento dorsales + respiración',
        notes: 'Hasta que no puedas hacer ni una más con técnica perfecta'
      },
      { 
        name: 'Dominadas asistidas', 
        type: 'series_reps', 
        unit: 'repeticiones por serie',
        sets: '4 series',
        intensity: 'NO al fallo (8-12 reps)',
        rest: '2-3 min',
        restActivity: 'Band pull-aparts + movilidad hombros',
        notes: 'Completar todas las reps con buena técnica'
      },
      { 
        name: 'Dominadas negativas', 
        type: 'series_reps', 
        unit: 'repeticiones por serie',
        sets: '3 series',
        intensity: 'NO al fallo (5 reps)',
        rest: '2-3 min',
        restActivity: 'Activación de core + respiración',
        notes: '5-8 segundos de descenso controlado por rep'
      },
      { 
        name: 'Colgadas estáticas', 
        type: 'series_reps', 
        unit: 'segundos por serie',
        sets: '3 series',
        intensity: 'AL FALLO',
        rest: '2 min',
        restActivity: 'Estirar antebrazos + caminar',
        notes: 'Hasta que se te aflojen las manos'
      },
      { 
        name: 'Remo con barra', 
        type: 'weight_reps', 
        unit: 'kg x repeticiones',
        sets: '4 series de 6-8 reps',
        intensity: 'NO al fallo (2-3 reps en reserva)',
        rest: '2-3 min',
        restActivity: 'Descanso normal',
        notes: 'Fuerza controlada, mantener técnica'
      },
      { 
        name: 'Press militar', 
        type: 'weight_reps', 
        unit: 'kg x repeticiones',
        sets: '4 series de 6-8 reps',
        intensity: 'NO al fallo (2-3 reps en reserva)',
        rest: '2-3 min',
        restActivity: 'Descanso normal',
        notes: 'Core firme, no arquear la espalda'
      }
    ],
    martes: [
      { 
        name: 'Sentadillas frontales', 
        type: 'weight_reps', 
        unit: 'kg x repeticiones',
        sets: '5 series de 5 reps',
        intensity: 'NO al fallo (2-3 reps en reserva)',
        rest: '2-3 min',
        restActivity: 'Descanso normal',
        notes: 'Mantener torso erguido, core firme'
      },
      { 
        name: 'Peso muerto rumano', 
        type: 'weight_reps', 
        unit: 'kg x repeticiones',
        sets: '4 series de 6-8 reps',
        intensity: 'NO al fallo (2-3 reps en reserva)',
        rest: '2-3 min',
        restActivity: 'Descanso normal',
        notes: 'Empujar caderas hacia atrás, isquios tensos'
      },
      { 
        name: 'Sentadillas búlgaras', 
        type: 'series_reps', 
        unit: 'repeticiones por serie',
        sets: '3 series por pierna',
        intensity: 'NO al fallo (difícil pero controlado)',
        rest: '1-2 min',
        restActivity: 'Cambio de pierna + respiración',
        notes: 'Descenso controlado, empuje con talón'
      },
      { 
        name: 'Sentadillas con salto (sin aterrizaje)', 
        type: 'series_reps', 
        unit: 'repeticiones por serie',
        sets: '4 series de 8-10 reps',
        intensity: 'Explosivo (NO al fallo)',
        rest: '1-2 min',
        restActivity: 'Caminar + respiración',
        notes: 'Salto explosivo hacia arriba, aterrizaje controlado'
      },
      { 
        name: 'Cardio finalizador', 
        type: 'completed', 
        unit: 'completado (sí/no)',
        sets: '5 rondas',
        intensity: 'AL FALLO por tiempo',
        rest: '30 seg entre rondas',
        restActivity: 'Respiración profunda',
        notes: '30 seg mountain climbers + 30 seg descanso x5'
      }
    ],
    miercoles: [
      { 
        name: 'Remo con barra', 
        type: 'weight_reps', 
        unit: 'kg x repeticiones',
        sets: '4 series de 8-10 reps',
        intensity: 'NO al fallo (2-3 reps en reserva)',
        rest: '2-3 min',
        restActivity: 'Descanso activo',
        notes: 'SUPERSERIE con fondos de tríceps (siguiente ejercicio)'
      },
      { 
        name: 'Fondos de tríceps', 
        type: 'series_reps', 
        unit: 'repeticiones por serie',
        sets: '3 series',
        intensity: 'NO al fallo (2-3 reps en reserva)',
        rest: '90 seg',
        restActivity: 'Estiramiento tríceps',
        notes: 'En banco o máquina, descenso controlado'
      },
      { 
        name: 'Remo sentado o cable', 
        type: 'weight_reps', 
        unit: 'kg x repeticiones',
        sets: '4 series de 10-12 reps',
        intensity: 'NO al fallo (2 reps en reserva)',
        rest: '2 min',
        restActivity: 'Movilidad hombros',
        notes: 'Retraer escápulas, pausa 1 seg al final'
      },
      { 
        name: 'Remo con mancuerna a 1 brazo', 
        type: 'weight_reps', 
        unit: 'kg x repeticiones',
        sets: '3 series de 10 reps por brazo',
        intensity: 'NO al fallo (2 reps en reserva)',
        rest: '90 seg',
        restActivity: 'Cambio de brazo',
        notes: 'Codo cerca del cuerpo, no rotar el torso'
      },
      { 
        name: 'Face pulls', 
        type: 'weight_reps', 
        unit: 'kg x repeticiones',
        sets: '3 series de 15-20 reps',
        intensity: 'NO al fallo',
        rest: '90 seg',
        restActivity: 'Rotaciones de hombros',
        notes: 'Cable a la altura de la cara, separar al final'
      },
      { 
        name: 'Extensiones de tríceps con cable', 
        type: 'weight_reps', 
        unit: 'kg x repeticiones',
        sets: '3 series de 12-15 reps',
        intensity: 'NO al fallo (1-2 reps en reserva)',
        rest: '90 seg',
        restActivity: 'Estiramiento tríceps',
        notes: 'Codos pegados al cuerpo, solo mover antebrazos'
      },
      { 
        name: 'Core funcional', 
        type: 'completed', 
        unit: 'completado (sí/no)',
        sets: '3 ejercicios',
        intensity: 'Controlado',
        rest: '1 min entre ejercicios',
        restActivity: 'Descanso normal',
        notes: 'Planchas + Palof press + Dead bugs'
      }
    ],
    jueves: [
      { 
        name: 'Press banca', 
        type: 'weight_reps', 
        unit: 'kg x repeticiones',
        sets: '4 series de 6-8 reps',
        intensity: 'NO al fallo (2-3 reps en reserva)',
        rest: '3 min',
        restActivity: 'Descanso activo',
        notes: 'SUPERSERIE con curl con mancuernas (siguiente ejercicio)'
      },
      { 
        name: 'Curl con mancuernas', 
        type: 'weight_reps', 
        unit: 'kg x repeticiones',
        sets: '3 series de 10-12 reps',
        intensity: 'NO al fallo (1-2 reps en reserva)',
        rest: '90 seg',
        restActivity: 'Estiramiento bíceps',
        notes: 'Subir ambas a la vez, controlar la bajada'
      },
      { 
        name: 'Press inclinado con mancuernas', 
        type: 'weight_reps', 
        unit: 'kg x repeticiones',
        sets: '3 series de 8-10 reps',
        intensity: 'NO al fallo (2 reps en reserva)',
        rest: '2-3 min',
        restActivity: 'Rotaciones de hombros',
        notes: 'Banco a 30-45°, bajar hasta los lados del pecho'
      },
      { 
        name: 'Dips en paralelas', 
        type: 'series_reps', 
        unit: 'repeticiones por serie',
        sets: '3 series',
        intensity: 'NO al fallo (8-12 reps)',
        rest: '2 min',
        restActivity: 'Estiramiento pecho y tríceps',
        notes: 'Ligera inclinación hacia adelante para pecho'
      },
      { 
        name: 'Elevaciones laterales', 
        type: 'weight_reps', 
        unit: 'kg x repeticiones',
        sets: '3 series de 12-15 reps',
        intensity: 'NO al fallo',
        rest: '90 seg',
        restActivity: 'Descanso activo',
        notes: 'Subir hasta altura de hombros, control total'
      },
      { 
        name: 'Curl martillo', 
        type: 'weight_reps', 
        unit: 'kg x repeticiones',
        sets: '3 series de 12-15 reps',
        intensity: 'NO al fallo (1 rep en reserva)',
        rest: '90 seg',
        restActivity: 'Estiramiento antebrazos',
        notes: 'Agarre neutro, subir ambas mancuernas a la vez'
      }
    ],
    viernes: [
      { 
        name: 'Dominadas con pausa', 
        type: 'series_reps', 
        unit: 'repeticiones por serie',
        sets: '4 series',
        intensity: 'AL FALLO (con pausa 2 seg arriba)',
        rest: '3-4 min',
        restActivity: 'Movilidad hombros + respiración',
        notes: 'Pausa 2 segundos arriba, después continuar al fallo'
      },
      { 
        name: 'Dominadas comando', 
        type: 'series_reps', 
        unit: 'repeticiones por serie',
        sets: '3 series',
        intensity: 'AL FALLO',
        rest: '3 min',
        restActivity: 'Estiramiento dorsales',
        notes: 'Agarre mixto (una mano prono, otra supino)'
      },
      { 
        name: 'Remo con mancuerna', 
        type: 'weight_reps', 
        unit: 'kg x repeticiones',
        sets: '4 series de 8-10 reps por brazo',
        intensity: 'NO al fallo (2 reps en reserva)',
        rest: '2 min',
        restActivity: 'Descanso normal',
        notes: 'Un brazo por vez, core estable'
      }
    ],
    sabado: [
      { 
        name: 'EMOM 20 min', 
        type: 'completed', 
        unit: 'completado (sí/no)',
        sets: '20 minutos total',
        intensity: 'NO al fallo (poder completar cada minuto)',
        rest: 'Lo que sobre del minuto',
        restActivity: 'Descanso activo en minuto 4',
        notes: 'Si no podés completar reps, reducí las repeticiones'
      },
      { 
        name: 'Dominadas EMOM', 
        type: 'reps', 
        unit: 'repeticiones totales',
        sets: 'Cada minuto 1',
        intensity: 'Controlado (NO al fallo)',
        rest: 'Resto del minuto',
        restActivity: 'Descanso pasivo',
        notes: '5 dominadas cada minuto 1 (min 1, 5, 9, 13, 17)'
      },
      { 
        name: 'Sesión movilidad', 
        type: 'time', 
        unit: 'minutos completados',
        sets: '25 minutos',
        intensity: 'Relajado',
        rest: 'No aplica',
        restActivity: 'Estiramientos profundos',
        notes: 'Hombros, dorsales, caderas + rodillo espuma'
      }
    ]
  };

  const getDataKey = (week, day, exercise) => `w${week}_${day}_${exercise}`;

  const updateData = (week, day, exercise, value) => {
    const key = getDataKey(week, day, exercise);
    setData(prev => ({ ...prev, [key]: value }));
  };

  const getData = (week, day, exercise) => {
    const key = getDataKey(week, day, exercise);
    return data[key] || '';
  };

  // Cálculo de progreso de dominadas
  const getDominadasProgress = () => {
    const progress = [];
    for (let week = 1; week <= 4; week++) {
      const lunes = getData(week, 'lunes', 'Dominadas estrictas');
      const miercoles = getData(week, 'miercoles', 'Dominadas estrictas');
      const viernes = getData(week, 'viernes', 'Dominadas con pausa');
      
      if (lunes || miercoles || viernes) {
        const maxReps = Math.max(
          parseFloat(lunes.split('x')[1]) || 0,
          parseFloat(miercoles.split('x')[1]) || 0,
          parseFloat(viernes.split('x')[1]) || 0
        );
        progress.push({ week, reps: maxReps });
      }
    }
    return progress;
  };

  // Cálculo de peso corporal
  const getPesoProgress = () => {
    const progress = [];
    for (let week = 1; week <= 4; week++) {
      // Obtener el peso del primer día registrado de la semana
      let peso = null;
      for (const day of ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado']) {
        const dayPeso = getData(week, day, 'peso_corporal');
        if (dayPeso) {
          peso = dayPeso;
          break;
        }
      }
      if (peso) {
        progress.push({ week, peso: parseFloat(peso) });
      }
    }
    return progress;
  };

  // Cálculo de datos del dashboard
  const getDashboardData = () => {
    const weeklyData = [];
    const dailyEnergy = [];
    const dominadasEvolution = [];
    const pesoEvolution = [];
    
    for (let week = 1; week <= 4; week++) {
      // Datos semanales
      const weekData = {
        week,
        completedDays: 0,
        totalDominadas: 0,
        avgEnergy: 0,
        peso: 0 // Se calculará después
      };
      
      let energySum = 0;
      let energyCount = 0;
      let dominadasThisWeek = 0;
      let pesoSum = 0;
      let pesoCount = 0;
      
      ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'].forEach(day => {
        // Verificar si el día está completado
        const hasData = workoutStructure[day]?.some(exercise => 
          getData(week, day, exercise.name)
        );
        if (hasData) weekData.completedDays++;
        
        // Energía del día
        const energy = parseInt(getData(week, day, 'energia')) || 0;
        if (energy > 0) {
          energySum += energy;
          energyCount++;
          dailyEnergy.push({ week, day, energy, date: `S${week}-${day}` });
        }
        
        // Peso del día
        const peso = parseFloat(getData(week, day, 'peso_corporal'));
        if (peso > 0) {
          pesoSum += peso;
          pesoCount++;
          pesoEvolution.push({ week, day, peso, date: `S${week}-${day}` });
        }
        
        // Dominadas por día
        if (day === 'lunes' || day === 'miercoles' || day === 'viernes') {
          const dominadasData = getData(week, day, day === 'lunes' ? 'Dominadas estrictas' : 
                                      day === 'miercoles' ? 'Dominadas estrictas' : 'Dominadas con pausa');
          if (dominadasData) {
            const matches = dominadasData.match(/(\d+)x(\d+)/g);
            if (matches) {
              const totalReps = matches.reduce((sum, match) => {
                const [series, reps] = match.split('x').map(Number);
                return sum + (series * reps);
              }, 0);
              dominadasThisWeek += totalReps;
              dominadasEvolution.push({ 
                week, 
                day, 
                reps: totalReps, 
                date: `S${week}-${day}`,
                maxReps: Math.max(...matches.map(m => parseInt(m.split('x')[1])))
              });
            }
          }
        }
      });
      
      weekData.totalDominadas = dominadasThisWeek;
      weekData.avgEnergy = energyCount > 0 ? Math.round(energySum / energyCount) : 0;
      weekData.peso = pesoCount > 0 ? Math.round(pesoSum / pesoCount * 10) / 10 : 0;
      
      weeklyData.push(weekData);
    }
    
    return { weeklyData, dailyEnergy, dominadasEvolution, pesoEvolution };
  };

  const renderExerciseInput = (exercise, week, day) => {
    const value = getData(week, day, exercise.name);
    
    switch (exercise.type) {
      case 'series_reps':
        return (
          <input
            type="text"
            placeholder="3, 4, 5, 3... (reps por serie)"
            value={value}
            onChange={(e) => updateData(week, day, exercise.name, e.target.value)}
            className="w-full p-3 border rounded-lg text-base"
          />
        );
      case 'weight_reps':
        return (
          <input
            type="text"
            placeholder="80x5, 75x6... (kg x reps)"
            value={value}
            onChange={(e) => updateData(week, day, exercise.name, e.target.value)}
            className="w-full p-3 border rounded-lg text-base"
          />
        );
      case 'time':
        return (
          <input
            type="number"
            placeholder="45 (segundos totales)"
            value={value}
            onChange={(e) => updateData(week, day, exercise.name, e.target.value)}
            className="w-full p-3 border rounded-lg text-base"
          />
        );
      case 'reps':
        return (
          <input
            type="number"
            placeholder="10 (total de reps)"
            value={value}
            onChange={(e) => updateData(week, day, exercise.name, e.target.value)}
            className="w-full p-3 border rounded-lg text-base"
          />
        );
      case 'completed':
        return (
          <select
            value={value}
            onChange={(e) => updateData(week, day, exercise.name, e.target.value)}
            className="w-full p-3 border rounded-lg text-base"
          >
            <option value="">Seleccionar</option>
            <option value="si">Completado ✓</option>
            <option value="parcial">Parcialmente</option>
            <option value="no">No completado</option>
          </select>
        );
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => updateData(week, day, exercise.name, e.target.value)}
            className="w-full p-3 border rounded-lg text-base"
          />
        );
    }
  };

  const handleSaveDay = () => {
    // Obtener el índice del día actual
    const dayIndex = days.findIndex(d => d === currentDay);
    
    // Si no es el último día de la semana, avanzar al siguiente
    if (dayIndex < 5) { // 5 es el índice de 'sábado'
      setCurrentDay(days[dayIndex + 1]);
    } else {
      // Si es sábado y no es la última semana, avanzar a la siguiente semana
      if (currentWeek < 4) {
        setCurrentWeek(currentWeek + 1);
        setCurrentDay('lunes');
      } else {
        // Si es el último día de la última semana, ir al dashboard
        setCurrentDay('dashboard');
      }
    }
    
    // Mostrar mensaje de confirmación
    alert('✅ Día guardado exitosamente!');
  };

  const exportData = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mi_progreso_4_semanas.json';
    link.click();
  };

  const dominadasProgress = getDominadasProgress();
  const pesoProgress = getPesoProgress();
  const dashboardData = getDashboardData();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">🏋️ Tracker 4 Semanas</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setShowRoutine(!showRoutine)}
                className="flex items-center gap-2 bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 text-sm"
              >
                <Calendar size={16} />
                {showRoutine ? 'Ocultar' : 'Rutina'}
              </button>
              <button
                onClick={exportData}
                className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 text-sm"
              >
                <Download size={16} />
                Exportar
              </button>
            </div>
          </div>
          
          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-green-100 p-3 rounded-lg text-center">
              <h3 className="font-semibold text-green-800 text-sm">🎯 Dominadas</h3>
              <p className="text-lg font-bold text-green-900">3 → 8-12</p>
              {dominadasProgress.length > 0 && (
                <p className="text-xs text-green-700">
                  Actual: {dominadasProgress[dominadasProgress.length - 1].reps} reps
                </p>
              )}
            </div>
            
            <div className="bg-blue-100 p-3 rounded-lg text-center">
              <h3 className="font-semibold text-blue-800 text-sm">⚖️ Peso</h3>
              <p className="text-lg font-bold text-blue-900">95 → 91-92kg</p>
              {pesoProgress.length > 0 && (
                <p className="text-xs text-blue-700">
                  Actual: {pesoProgress[pesoProgress.length - 1].peso}kg
                </p>
              )}
            </div>
            
            <div className="bg-purple-100 p-3 rounded-lg text-center">
              <h3 className="font-semibold text-purple-800 text-sm">📅 Progreso</h3>
              <p className="text-lg font-bold text-purple-900">Sem {currentWeek}/4</p>
              <p className="text-xs text-purple-700">¡Constancia!</p>
            </div>
          </div>
        </div>

        {/* Rutina Semanal Simple */}
        {showRoutine && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-lg font-bold text-gray-800 mb-3">📅 Rutina Semanal Completa</h2>
            <div className="space-y-2 text-sm">
              <div className="border-b pb-2">
                <strong>LUNES:</strong>
                {workoutStructure.lunes?.map((ex, i) => (
                  <div key={i} className="ml-2">{i+1}. {ex.name} - {ex.sets}</div>
                ))}
              </div>
              <div className="border-b pb-2">
                <strong>MARTES:</strong>
                {workoutStructure.martes?.map((ex, i) => (
                  <div key={i} className="ml-2">{i+1}. {ex.name} - {ex.sets}</div>
                ))}
              </div>
              <div className="border-b pb-2">
                <strong>MIÉRCOLES:</strong>
                {workoutStructure.miercoles?.map((ex, i) => (
                  <div key={i} className="ml-2">{i+1}. {ex.name} - {ex.sets}</div>
                ))}
              </div>
              <div className="border-b pb-2">
                <strong>JUEVES:</strong>
                {workoutStructure.jueves?.map((ex, i) => (
                  <div key={i} className="ml-2">{i+1}. {ex.name} - {ex.sets}</div>
                ))}
              </div>
              <div className="border-b pb-2">
                <strong>VIERNES:</strong>
                {workoutStructure.viernes?.map((ex, i) => (
                  <div key={i} className="ml-2">{i+1}. {ex.name} - {ex.sets}</div>
                ))}
              </div>
              <div>
                <strong>SÁBADO:</strong>
                {workoutStructure.sabado?.map((ex, i) => (
                  <div key={i} className="ml-2">{i+1}. {ex.name} - {ex.sets}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Week Selection */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">Semana</label>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map(week => (
                <button
                  key={week}
                  onClick={() => setCurrentWeek(week)}
                  className={`py-2 px-3 rounded-lg font-medium text-sm ${
                    currentWeek === week 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Sem {week}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Día</label>
            <div className="grid grid-cols-4 gap-2">
              {days.slice(0, 4).map(day => (
                <button
                  key={day}
                  onClick={() => setCurrentDay(day)}
                  className={`py-2 px-2 rounded-lg text-xs font-medium ${
                    currentDay === day 
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {day.slice(0, 3).toUpperCase()}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {days.slice(4).map(day => (
                <button
                  key={day}
                  onClick={() => setCurrentDay(day)}
                  className={`py-2 px-2 rounded-lg text-xs font-medium ${
                    currentDay === day 
                      ? (day === 'dashboard' ? 'bg-purple-600 text-white' : 'bg-green-600 text-white')
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {day === 'dashboard' ? '📊 STATS' : day.slice(0, 3).toUpperCase()}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-md">
          {currentDay === 'dashboard' ? (
            // DASHBOARD SIMPLIFICADO PARA MÓVIL
            <div className="p-4 space-y-4">
              <h2 className="text-xl font-bold text-gray-800">📊 Dashboard</h2>
              
              {/* Resumen rápido */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <h4 className="font-bold text-blue-800 text-sm">Entrenamientos</h4>
                  <p className="text-xl font-bold text-blue-900">
                    {dashboardData.weeklyData.reduce((sum, w) => sum + w.completedDays, 0)}/24
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <h4 className="font-bold text-green-800 text-sm">Dominadas</h4>
                  <p className="text-xl font-bold text-green-900">
                    {dashboardData.weeklyData.reduce((sum, w) => sum + w.totalDominadas, 0)}
                  </p>
                </div>
              </div>

              {/* Progreso semanal simplificado */}
              <div className="space-y-2">
                <h3 className="font-bold text-gray-800">📊 Por Semana</h3>
                {dashboardData.weeklyData.map((week) => (
                  <div key={week.week} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Semana {week.week}</span>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        week.completedDays >= 5 ? 'bg-green-100 text-green-800' :
                        week.completedDays >= 3 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {week.completedDays}/6
                      </span>
                      <span className="text-sm font-bold text-blue-600">
                        {week.totalDominadas}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Evolución dominadas */}
              {dashboardData.dominadasEvolution.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-bold text-gray-800">💪 Dominadas</h3>
                  {dashboardData.dominadasEvolution.slice(-6).map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <span className="text-sm">S{entry.week} - {entry.day}</span>
                      <div className="text-right">
                        <span className="font-bold text-blue-900">{entry.reps}</span>
                        <span className="text-xs text-blue-600 ml-1">(máx: {entry.maxReps})</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Evolución del peso */}
              {dashboardData.pesoEvolution.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-bold text-gray-800">⚖️ Peso Corporal</h3>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <div className="text-sm font-medium text-yellow-800 mb-2">Meta: 95kg → 91-92kg</div>
                    {dashboardData.pesoEvolution.slice(-7).map((entry, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white rounded mb-1">
                        <span className="text-sm">S{entry.week} - {entry.day}</span>
                        <span className="font-bold text-yellow-900">{entry.peso} kg</span>
                      </div>
                    ))}
                    {dashboardData.pesoEvolution.length > 1 && (
                      <div className="mt-2 pt-2 border-t border-yellow-200">
                        <div className="flex justify-between text-sm">
                          <span className="text-yellow-700">Cambio total:</span>
                          <span className={`font-bold ${
                            dashboardData.pesoEvolution[dashboardData.pesoEvolution.length - 1].peso < dashboardData.pesoEvolution[0].peso
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}>
                            {(dashboardData.pesoEvolution[dashboardData.pesoEvolution.length - 1].peso - dashboardData.pesoEvolution[0].peso).toFixed(1)} kg
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            // WORKOUT DEL DÍA
            <div className="p-4 space-y-4">
              <h2 className="text-xl font-bold text-gray-800 sticky top-0 bg-white z-10 pb-2">
                📊 Sem {currentWeek} - {currentDay.charAt(0).toUpperCase() + currentDay.slice(1)}
              </h2>
              
              {/* Peso corporal del día */}
              <div className="border rounded-lg p-4 bg-yellow-50">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  💪 Peso Corporal
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    placeholder="95.0"
                    value={getData(currentWeek, currentDay, 'peso_corporal')}
                    onChange={(e) => updateData(currentWeek, currentDay, 'peso_corporal', e.target.value)}
                    className="w-32 p-3 border rounded-lg text-base"
                  />
                  <span className="text-gray-600">kg</span>
                </div>
              </div>
              
              {workoutStructure[currentDay]?.map((exercise, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-gray-800 flex-1">{exercise.name}</h3>
                    <div className="text-right text-sm text-gray-600 ml-2">
                      <div>{exercise.sets}</div>
                      <div className="text-xs">{exercise.unit}</div>
                    </div>
                  </div>
                  
                  {/* Intensidad */}
                  <div className="bg-gray-50 p-2 rounded flex items-center gap-2 text-sm">
                    <Zap size={14} className={exercise.intensity.includes('AL FALLO') ? 'text-red-500' : 'text-green-500'} />
                    <span className={`font-medium ${
                      exercise.intensity.includes('AL FALLO') ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {exercise.intensity}
                    </span>
                  </div>
                  
                  {/* Descanso */}
                  <div className="bg-blue-50 p-2 rounded text-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock size={14} className="text-blue-500" />
                      <span className="font-medium text-blue-800">Descanso: {exercise.rest}</span>
                    </div>
                    <div className="text-blue-700 text-xs">{exercise.restActivity}</div>
                  </div>
                  
                  {/* Notas */}
                  <div className="bg-yellow-50 p-2 rounded text-sm">
                    <span className="font-medium text-yellow-800">💡 </span>
                    <span className="text-yellow-700">{exercise.notes}</span>
                  </div>
                  
                  {/* Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Resultado:
                    </label>
                    {renderExerciseInput(exercise, currentWeek, currentDay)}
                  </div>
                </div>
              ))}
              
              {/* Notas del día */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📝 Notas del entrenamiento
                </label>
                <textarea
                  placeholder="¿Cómo te sentiste?"
                  value={getData(currentWeek, currentDay, 'notas')}
                  onChange={(e) => updateData(currentWeek, currentDay, 'notas', e.target.value)}
                  className="w-full p-3 border rounded-lg h-20 resize-none text-base"
                />
              </div>
              
              {/* Energía */}
              <div className="border rounded-lg p-4 bg-green-50">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ⚡ Energía (1-10)
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={getData(currentWeek, currentDay, 'energia') || 5}
                  onChange={(e) => updateData(currentWeek, currentDay, 'energia', e.target.value)}
                  className="w-full h-8"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Agotado</span>
                  <span className="font-medium text-lg">
                    {getData(currentWeek, currentDay, 'energia') || 5}/10
                  </span>
                  <span>Excelente</span>
                </div>
              </div>
              
              {/* Botón Guardar Día */}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleSaveDay}
                  className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  <Save size={20} />
                  Guardar día y continuar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tips de la semana */}
        <div className="bg-white rounded-lg shadow-md p-4 mt-4">
          <h3 className="text-lg font-bold text-gray-800 mb-3">💡 Tips Semana {currentWeek}</h3>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3">
            {currentWeek === 1 && (
              <div>
                <p className="font-medium text-sm">🎯 Semana 1: Establecer base</p>
                <p className="text-xs text-gray-700 mt-1">Enfócate en técnica perfecta. No te frustres si no llegás a todas las reps.</p>
              </div>
            )}
            {currentWeek === 2 && (
              <div>
                <p className="font-medium text-sm">📈 Semana 2: Incrementar volumen</p>
                <p className="text-xs text-gray-700 mt-1">Ya deberías sentir mejoras. Incrementá las dominadas asistidas.</p>
              </div>
            )}
            {currentWeek === 3 && (
              <div>
                <p className="font-medium text-sm">🔥 Semana 3: Intensificar</p>
                <p className="text-xs text-gray-700 mt-1">La semana más dura. Prestá extra atención a la recuperación.</p>
              </div>
            )}
            {currentWeek === 4 && (
              <div>
                <p className="font-medium text-sm">🏆 Semana 4: Preparar el regreso</p>
                <p className="text-xs text-gray-700 mt-1">Reducí volumen pero mantené intensidad. Agregá movimientos de fútbol.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
};

function App() {
  return <TrainingTracker />;
}

export default App;